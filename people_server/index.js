//1 step
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//2 step
const app = express();
//tell the app:"if any request has JSON data, understand"
app.use(express.json());
//tell the app:"allow other URL's to interact and share"
app.use(cors());
//3 step
mongoose.connect("mongodb://127.0.0.1:27017/testdb")
//if connection works
.then(() => console.log("MongoDB Connected"))
//if connection fails
.catch(err => console.log("MongoDB Error",err));
//4 step:define model
const Person = mongoose.model("Person",new mongoose.Schema({name:String , age:Number}),{versionKey:false});
//step 5
//READ - (GET request)
//when user goes to server URL with GET method -> fetch all people from mongoDB,
//sort name and send back as JSON to browser
app.get("/",async(_req, res) => {
    try{
        const people = await Person.find().sort({name:1});
        res.json(people);//send the list json to browser
    }catch(e){
        res.status(500).json({error: e.message});
    }
}); 

app.post("/",async(_req, res) => {
    try{
        const people = await Person.create(
            {
                name: req.body.name,
                age: Number(req.body.age)
            }
        );
        res.status(201).json(people);
         }catch(e){
            res.status(400).json({error: e.message});
        }
}); 

//6 step
//tell expess to start listening on port 4000
app.listen(4000,() =>console.log("Express api server is running in 4000 ports"))
