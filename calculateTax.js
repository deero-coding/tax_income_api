function calculateTax(grossIncome, expenses){
    const profit = grossIncome - expenses;
    if (profit <= 0) return {CRA:0,
        chargeableIncome: 0, tax:0
    };
    // CRA
    const CRA = Math.max(200000, grossIncome * 0.01) + grossIncome * 0.2;

    let chargeableIncome = profit - CRA;
    if (chargeableIncome <= 0) {return {CRA,
        chargeableIncome:0, tax:0
    };
} 
     let remainingIncome =chargeableIncome;
    let tax = 0;
    const bands = [
        {limit:300000, rate:0.07},
        {limit:300000, rate:0.11},
        {limit:500000, rate:0.15},
        {limit:500000, rate:0.19},
        {limit:1600000, rate:0.21},
        {limit:Number.MAX_SAFE_INTEGER, rate:0.24}
    ];
    for(const band of bands) {
        if (chargeableIncome <= 0)break;
        const taxable = Math.min(remainingIncome, band.limit);
        tax += taxable * band.rate;
        remainingIncome -= taxable;
    }

    const minimumTax = grossIncome * 0.01;
    tax = Math.max (tax, minimumTax);
    return{CRA, chargeableIncome: profit-CRA, tax};
}

module.exports = calculateTax;