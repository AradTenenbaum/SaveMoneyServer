"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const { testValidation } = require('../utils/validation');
// Register
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation
    const { error } = testValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // Check if user exist
    const usernameExist = yield User.findOne({ username: req.body.username });
    if (usernameExist)
        return res.status(400).send('Username already exist');
    // Hash Password
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(req.body.password, salt);
    // Create new User
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });
    // Save user to DB
    try {
        const savedUser = yield user.save();
        res.send({ user: user._id });
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation
    const { error } = testValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // Check if user exist
    const user = yield User.findOne({ username: req.body.username });
    if (!user)
        return res.status(400).send('Wrong Username');
    // Password Check
    const validPass = yield bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send('Password is wrong');
    // Create and assign a login token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.send({
        user,
        token
    });
}));
module.exports = router;
