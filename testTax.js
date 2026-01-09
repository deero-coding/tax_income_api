const calculateTax = require("./calculateTax");
// examples Values
const grossIncome = 2_000_000;
const expenses = 500_000;

const result = calculateTax(grossIncome, expenses);
console.log(result);