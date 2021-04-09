const jwt = require('jsonwebtoken');
import {Request, Response, NextFunction} from 'express';


module.exports = function(req: Request, res: Response, next: NextFunction) {
    const token: (string | undefined) = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.body.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

