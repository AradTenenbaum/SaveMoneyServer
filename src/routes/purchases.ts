import {Request, Response} from 'express';
import type {PurchaseType} from '../utils/types';
const router = require("express").Router();
const Purchase = require('../model/Purchase');
const verify = require('./verifyToken');

// All my purchases
router.get('/myPurchases/:userId', verify, async (req: Request, res: Response) => {
    // Get user id
    const userId: string = req.params.userId;
    // Get all
    try {
        const purchases: PurchaseType[] = await Purchase.find({userId});
        res.send(purchases);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add a purchase
router.post('/add', verify, async (req: Request, res: Response) => {
    // Create new purchase
    const purchase: typeof Purchase = new Purchase({
        name: req.body.name,
        price: req.body.price,
        userId: req.body.userId,
        date: req.body.date? req.body.date : Date.now()
    });
    // Save to DB
    try {
        await purchase.save();
        res.send(purchase);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete purchase
router.delete('/delete/:purchaseId', verify, async (req: Request, res: Response) => {
    try {
        await Purchase.deleteOne({_id: req.params.purchaseId});
        res.send('Deleted succesfully');
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete all my purchases
router.delete('/deleteAll/:userId', verify, async (req: Request, res: Response) => {
    try {
        await Purchase.deleteMany({userId: req.params.userId});
        res.send('Deleted succesfully');
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;