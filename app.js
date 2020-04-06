const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const todoRoute = require('./routes/todo');

app.set('view engine','pug');
app.set('views',"views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'/public')));

app.use('/',todoRoute);

app.listen(3100,()=>{
    console.log("App is listening at port 3100");
});