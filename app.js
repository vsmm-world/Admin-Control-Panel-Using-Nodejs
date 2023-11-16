const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const ConnectDB = require('./db/db');
const {adminAuth, logout, chekAuth} = require('./auth/auth')
const cookieParser = require('cookie-parser')

app.use(express.static('public'))
app.set("view engine", 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use("/admin",require('./auth/route'));
app.use(cookieParser())


ConnectDB()

app.listen(PORT, () => {
    console.log(`Website is Running at http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/admin',adminAuth,(req,res)=>{
    res.render('admin');
})
app.get('/admin/register',chekAuth, (req, res) => {
    res.render('adminRegister')
})
app.get('/admin/login',chekAuth, (req, res) => {
    res.render('adminLogin')
})
app.get('/admin/logout',logout,(req,res)=>{
    res.redirect('/admin/login')
})
