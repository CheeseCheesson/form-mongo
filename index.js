const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

express.json()
const BDmongoose = "mongodb+srv://";

mongoose.connect(BDmongoose)

const PORT = 8081;

const dataBase = mongoose.connection

dataBase.on('error', err => console.log.bind(console, "connection error"))
dataBase.once('open', function (callback) {console.log("connection successful");
})

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.post('/api/users', function (req, res) {
  console.log('req.body', req.body);
  const {userName, userPassword, userAge} = req.body

  const data = {
    "userName": userName,
    "userPassword": userPassword,
    "userAge": userAge
  }
console.log('data', data);

  dataBase.collection('usersForm').insertOne(data, function(err, collection) {
    if(err) throw err;
    console.log("Record inserted Successfully");
  })
  return res.redirect('/')
}).listen(PORT)

