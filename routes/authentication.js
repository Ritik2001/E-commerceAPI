const router = require("express").Router();
const User= require("../models/User")
const CryptoJS= require("crypto-js");

const jwt = require("jsonwebtoken")
router.post("/register", async (req,res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, 'Ritik').toString(),
    });

    try{
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
    
})

router.post("/login",async (req,res)=>{
    try{
        const user= await User.findOne({username: req.body.username});

        if(!user)
        {
            res.status(401).json("Wrong Credentials");
        }
        else{
            const actualPassword=CryptoJS.AES.decrypt(user.password,'Ritik').toString(CryptoJS.enc.Utf8);
            if(actualPassword !== req.body.password){
            res.status(401).json("Wrong Credentials");
            }
        else{
            const accessToken= jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,

            },"Ritik", {expiresIn: "3d"});

            const {password , ...others }= user._doc;
            res.status(200).json({...others, accessToken});
            }
     }

    }
    catch(err){
        res.status(500).json(err);
    }

})
module.exports= router;