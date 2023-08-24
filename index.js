const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const { blogRouter } = require("./Routes/blog.route");
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use("/", blogRouter);


app.get("/", (req,res) => {
    try{
     res.status(200).send("Welcome to the HomePage");
    }catch(err){
      res.status(400).json({error:err});
    }
})



app.listen(process.env.PORT, async() => {
    try{
      await connection;
      console.log("Connected to the DB");
      console.log(`Running at ${process.env.PORT} port`);
    }catch(err){
        console.log(err);
    }
})


