const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://uminoh:dbalsgh10@bolierplate-s7iju.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hellow World'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));