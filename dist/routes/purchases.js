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
const Purchase = require('../model/Purchase');
const verify = require('./verifyToken');
// All my purchases
router.get('/myPurchases/:userId', verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user id
    const userId = req.params.userId;
    // Get all
    try {
        const purchases = yield Purchase.find({ userId });
        res.send(purchases);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Add a purchase
router.post('/add', verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create new purchase
    const purchase = new Purchase({
        name: req.body.name,
        price: req.body.price,
        userId: req.body.userId,
        date: req.body.date ? req.body.date : Date.now()
    });
    // Save to DB
    try {
        yield purchase.save();
        res.send(purchase);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Delete purchase
router.delete('/delete/:purchaseId', verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Purchase.deleteOne({ _id: req.params.purchaseId });
        res.send('Deleted succesfully');
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Delete all my purchases
router.delete('/deleteAll/:userId', verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Purchase.deleteMany({ userId: req.params.userId });
        res.send('Deleted succesfully');
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
module.exports = router;
