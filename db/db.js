const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/trial'


const ConnectDB = async ()=>{

    await mongoose.connect(uri);

   console.log("Connected");
   
}


module.exports= ConnectDB;