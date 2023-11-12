const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jswSecret = '5aca7d1cd7ac73f8e196e86e3d68f7c72f96dea66d5604f2da3a5ef66622e072f701ef'


exports.register = async (req, res, next) => {

    const { name, username, email, password } = req.body;

    bcrypt.hash(password, 10).then(async (hash) => {

        await Admin.create({
            username,
            name,
            email,
            password: hash,
        }).then((usr) => {

            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
                { id: usr._id, email, username },
                jswSecret,
                {
                    expiresIn: maxAge,
                }
            );
            res.cookie('admin', token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
            });
            res.status(200).json({
                message: "Admin Registered SuccessFully",
                usr: usr.username,
            });

        }).catch((err) => {
            res.status(401).json({
                message: 'Not Registerd',

            })
        })

    })

}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;


    const usr = await Admin.findOne({ username });
    const email = usr.email;
    if (!usr) {
        res.status(401).json({
            message: 'Not Logged in',
            error: "User Not Found"
        })
    } else {
        bcrypt.compare(password, usr.password).then((result) => {


            if (result) {

                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { id: usr._id, email, username }
                    , jswSecret,
                    {
                        expiresIn: maxAge,
                    }
                )

                res.cookie('admin', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                });

                res.status(200).json({
                    message: 'login Success !',
                    name: usr.name,
                })


            } else {
                return res.status(400).json({
                    message: "Not Logged in Successfully !"
                })
            }

        }).catch((err) => {
            return res.status(400).json({
                message: "Not Logged in ",
                error: err.message,
            })
        })
    }

}

exports.adminAuth = (req, res, next) => {

    const token = req.cookies.admin;

    if (token) {
        jwt.verify(token, jswSecret, (err, decodedToken) => {
            if (err) {
                res.redirect('/admin/login')
            } else {
                next();
            }
        })
    } else {
        res.status(401).redirect('/admin/login')
    }
}
exports.chekAuth = (req, res, next) => {

    const token = req.cookies.admin;

    if (token) {
        jwt.verify(token, jswSecret, (err, decodedToken) => {
            if (err) {
               next();
            } else {
                res.redirect('/admin');
            }
        })
    } else {
        next();

    }
}

exports.logout = async (req, res, next) => {
    res.clearCookie('admin');
    next();
}