const express = require("express");
const app = express();
const port = 80;
const mongoose = require("mongoose")
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/members', {useNewUrlParser: true});

const gymSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    locality: String,
    email: String,
    number: String
});
const gym = mongoose.model('gym', gymSchema);
app.set('view engine', 'pug')
app.use(express.urlencoded())

app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('gym.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new gym(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")})
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});