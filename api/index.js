const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');

const uploadMiddleware = multer({dest: 'uploads/'});

const mongoose = require('mongoose');
const UserModel = require('./models/User');
const PostModel = require('./models/Post');

const salt = bcrypt.genSaltSync(10);
const secret = 'secret';

const app = express();
app.use(cors({credentials: true,origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

try {
    mongoose.connect('mongodb://127.0.0.1:27017/myappblog')
        .then(() => console.log)
} catch (error) {
    console.log(error);
}

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = new UserModel({username, password:bcrypt.hashSync(password,salt)});
        await user.save();
        res.status(200).send(user);
    } catch (error) {        
        res.status(400).send(error);
    }
});

app.post('/login', async (req, res) => {
    const{username,password} = req.body;
    const userDocs = await UserModel.findOne({username});
    const passOk = bcrypt.compareSync(password, userDocs.password);
    if (passOk) {
        jwt.sign({username,id:userDocs._id},secret,{},(err,token) => {
            if(err) throw err;
            res.cookie('token',token).send({
                id:userDocs._id,
                username,
            });
        })
    } else {
        res.status(400).send('wrong credentials');        
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies
    jwt.verify(token,secret,{}, (err, info) => {
        if (err) throw err;
        res.json(token);
    });
});

app.post('/logout',(req,res) => {
    res.cookie('token','').send('OK');
});

app.post('/post',uploadMiddleware.single('file'), async (req, res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1 ];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath);

    const {title,summary,content} = req.body;
    
    const Post = await PostModel.create({
        title,
        summary,
        content,
        cover:newPath
    });

    res.json(Post);
})

app.listen(4000);