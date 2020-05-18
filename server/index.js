const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err));

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));

/*
app.use('/uploads', express.static('uploads'));

if(process.env.MODE_ENV === "production"){

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })

}

const port = process.env.PORT || 5000;
*/

const port = 5000;

app.listen(port, () => console.log(`Server Running at port ${port}!`));