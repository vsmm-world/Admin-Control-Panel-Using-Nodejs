const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlenght: 6,
        required: true,
    },
},
    {
        timestamp: {
            createdAt: 'created_at',
            modifiedAt: 'modified_at'
        }
    }
)


const Admin = new mongoose.model('admin', UserSchema);

module.exports = Admin;
