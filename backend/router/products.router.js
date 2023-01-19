const express = require("express");
const app = express();
const ProductRouter = express.Router();
const { WomenModel } = require("../model/women.model");
const { MenModel } = require("../model/men.model");
const { KidsModel } = require("../model/kids.model");
const { KitchenModel } = require("../model/kitchen.model");

app.use(express.json());

ProductRouter.post("/create", async(req,res)=>{
    const {name,strike_price,price,rating,price_off,no_of_products,thumbnail} = req.body;
    try {
        const data = new WomenModel({name,strike_price,price,rating,price_off,no_of_products,thumbnail});
        await data.save();
        res.send("Data added");
    } catch (error) {
        console.log(error);
        res.send("Error while adding data");
    }
})

ProductRouter.get("/women", async (req,res)=>{
    try {
        const data = await WomenModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Error while getting all products");
    }
})

ProductRouter.post("/women", async(req,res)=>{
    try {
        const data = new WomenModel(req.body);
        await data.save();
        res.send("Data saved")
    } catch (error) {
        console.log(error);
        res.send("Error posting women data")
    }
})

ProductRouter.get("/men", async (req,res)=>{
    try {
        const data = await MenModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Error while getting all products");
    }
})

ProductRouter.get("/kids", async (req,res)=>{
    try {
        const data = await KidsModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Error while getting all products");
    }
})

ProductRouter.get("/kitchen", async (req,res)=>{
    try {
        const data = await KitchenModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Error while getting all products");
    }
})

module.exports = { ProductRouter };