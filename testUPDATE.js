const fetch = require("node-fetch");
async function testUpdate(){
    try{
        const id = "695fe49be77fdfee933f0816";
        const res = await 
        fetch(`http://localhost:3000/income/${id}`, {
            method: "PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({grossIncome:2000000, expenses:80000})
        });
        const data = await res.json();
        console.log("Updated record:", data);
    } catch(err){
        console.error("UPDATE error:", err);
    }
}
testUpdate();