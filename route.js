const express = require("express");
const router = express.Router();
 const Income = require("./income");
 const calculateTax = require("./calculateTax");

 router.post("/", async (req, res) => {
    try{
        const {freelancerId, grossIncome, expenses} = req.body;

        const result = calculateTax(grossIncome, expenses);
        const record = await Income.create({
            freelancerId,
            grossIncome,
            expenses,
            CRA: result.CRA,
            chargeableIncome: result.chargeableIncome,
            tax: result.tax
        });
        res.status (201).json(record);
    }catch(err) {
        res.status(400).json({error: err.message});
    }
 });
//  GET a single record by ID
router.get("/:id", async (req, res) =>{
    try{
        const record = await
        Income.findById(req.params.id);
        if(!record) {
            return
        res.status(404).json({error: "Record not found"});  
    }res.json(record);
}catch (error){
        res.status(500).json({error:
            error.message
        });
    }
});
// GET all records for a freelancer by freelancerId
router.get("/", async(req, res) =>{
    try{
        const {freelancerId} = req.query;
        if(!freelancerId){
            return res.status(400).json({error: "freelancerId is required"});
        }
        const records = await
        Income.find({freelancerId});
        if(!records || records.length === 0){
            return res.status(404).json({error:"No records found"});
        }
        res.json(records);
    } catch (error){
        res.status(500).json({error:
            error.message
        });
    }
});
// Update a single record income
router.put("/:id", async (req, res) =>{
    try{
        const{id} = req.params;
        // get te record id from url
        const record = await Income.findById(id);
        if(!record){
            return res.status(404).json({error: "Record not found"});
        }
        // update only if values are provided
        record.grossIncome = req.body.grossIncome ?? record.grossIncome;
        record.expenses = req.body.expenses ?? record.expenses;
        // recalculate CRA, chargeableIncome, and tax
        const result = 
        calculateTax(record.grossIncome, record.expenses);
        record.CRA = result.CRA;
        record.chargeableIncome = result.chargeableIncome;
        record.tax = result.tax;

        await record.save();
        // save updated record
        res.json(record); 
        // return updated record
    } catch (error){
        res.status(400).json({error: error.message});
    }
});
// DELETE a single income record by ID
router.delete("/:id", async (req, res) => {
    try{
        const record = await Income.findByIdAndDelete(req.params.id);

        if(!record){
            return res.status(404).json({error: "Record not found"});
        }
        res.status(200).json({message: "Record deleted successfullly"});
    } catch(error){
        res.status(500).json({ error: error.message});
    }
});
 module.exports = router;