const Home = require('../models/home')

const Data = async (req,res,next)=>{

    const result = await Home.find({});

    if(result){
      return  res.status(200).json(result)
    }else{
        res.status(400).json({
            message:"No Data Found"
        })
    }

}


module.exports= Data;