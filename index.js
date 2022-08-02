const express = require("express");
const mongoose= require("mongoose");
const env = require("dotenv");
const userRoute= require("./routes/user")
const authRoute= require("./routes/authentication")
const productRoute= require("./routes/product")
const cartRoute= require("./routes/cart")
const orderRoute= require("./routes/order")
const cors= require("cors")
    env.config();

const app = express();

    mongoose.connect(
    process.env.CONNECTION_STRING
    ).then(()=> console.log("DB Connection Successful" ))
    .catch((err)=>{
    console.log(err)
    });
    app.use(cors());
    app.use(express.json())
    app.use("/api/auth",authRoute)
    app.use("/api/users",userRoute)
    app.use("/api/products",productRoute)
    app.use("/api/carts",cartRoute)
    app.use("/api/orders",orderRoute)
  

    app.listen(5000, ()=>{
    console.log("Backend server is running")
    });
