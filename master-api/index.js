const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use('/',router);

app.listen(8000, function(){
    console.log('Master-API is listening to port 8000');
})