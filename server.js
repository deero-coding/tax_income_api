const express = require("express");
const mongoose = require("mongoose");
const Income = require("./income");
const calculateTax = require("./calculateTax");
const route = require ("./route");

const app = express();
app.use(express.json());
app.use("/income", route);

mongoose.connect('mongodb://localhost:27017/taxappdb')
.then(()=> console.log("mongodb connected"))
.catch(err=>console.error(err));

// Minimal POST route to test saving
app.post("/", async(req, res) => {
    try{
        const {freelancerId, grossIncome, expenses} = req.body;
        const result = calculateTax(grossIncome, expenses);

        const record = await income.create({
            freelancerId,
            grossIncome,
            expenses,
            CRA: result.CRA,
            chargeableIncome: result.chargeableIncome,
            tax: result.tax
        });res.status(201).json(record);
    } catch (error) {
    res.status(400).json({error: error.message});
    }
});
app.listen(3000, ()=> 
    console.log("server is running on port 3000")
);
