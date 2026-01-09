const fetch = require("node-fetch");
const BASE_URL =
"http://localhost:3000/income";
    async function testPost(){
        try{
        const response = await fetch(BASE_URL,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            freelancerId: "F123",
            grossIncome: 1500000,
            expenses:600000
        })
    });
    const data = await response.json();
    console.log("POST Response:", data);
} catch (err){console.error("POST Error:", err.message);
 }
}
testPost();