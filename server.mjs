import express, { response } from 'express';
import bcrypt, { compareSync } from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import Register from './Controllers/Register.mjs';
import Signin from './Controllers/Signin.mjs';
import Image from './Controllers/Image.mjs';
import Profile from './Controllers/Profile.mjs';

const db= knex({
    client: 'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password: 'test',
        database:'smart-brain'
    }
});

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
    res.send('success');
})

app.post('/signin' ,  (req, res)=> {Signin.handleSignin(req, res, db,bcrypt)})


app.post('/register', (req, res)=> {Register.handleRegister(req, res, db,bcrypt)})


app.get('/profile/:id', (req, res)=> {Profile.handleProfile(req, res, db)})


app.put('/image', (req, res)=> {Image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=> {Image.handleApiCall(req, res)})
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})
