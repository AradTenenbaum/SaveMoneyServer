import {Request, Response} from 'express';
import type {UserType} from '../utils/types';
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const {testValidation} = require('../utils/validation');

// Register
router.post('/register', async (req: Request, res: Response) => {
    // Validation
    const {error} = testValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if user exist
    const usernameExist: (UserType | undefined) = await User.findOne({username: req.body.username});
    if(usernameExist) return res.status(400).send('Username already exist');
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(req.body.password, salt);
    // Create new User
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });
    // Save user to DB
    try {
        const savedUser: UserType = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
    // Validation
    const {error} = testValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if user exist
    const user: (UserType | undefined) = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Wrong Username');
    // Password Check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password is wrong'); 
    // Create and assign a login token
    const token = jwt.sign({...user}, process.env.TOKEN_SECRET);
    res.send({
        user,
        token
    });
});


module.exports = router;
