const mongoose = require("mongoose");
const incomeSchema = new mongoose.Schema ({
    freelancerId:{type: String, required:true},
    grossIncome:{type: Number, required:true},
    expenses:{type: Number, default: 0},
    CRA: Number,
    chargeableIncome: Number,
    tax: Number,
    createdAt:{ type: Date, default: Date.now}
});
module.exports = mongoose.model("income", incomeSchema);