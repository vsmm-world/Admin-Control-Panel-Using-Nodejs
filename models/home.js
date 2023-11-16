const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    subtitle:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    }
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at',
    }
});

const Home = new mongoose.model('HomeTamplate',homeSchema)

module.exports = Home;

