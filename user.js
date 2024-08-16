const express = require("express");
const app = express();
const userRouter = require("./routes/user_Routes");
const port = 4100;

// Database connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/crud")
         .then(() => console.log("Mongodb is connected"))
         .catch((err)=> console.log(err))
 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) =>{
    res.json({msg : "Welcome to server"})
})


app.use("/api/user",userRouter);


app.listen(port,() => console.log("Server Started On This ",`${port}`))

