const fetch = require("node-fetch");
async function testDelete(){
    try{
        const response = await
        fetch("http://localhost:3000/income/695fe49be77fdfee933f0816", {
            method:"DELETE",
            headers: {"Content-Type": "apllication/json"},
        });
        const data = await response.json();
        console.log("DELETE response:", data);
    }catch (err){
        console.error("DELETE error:", err);
    }
}
testDelete();