const fetch = require("node-fetch");
// Replace this with the _id you got from your POST
const TEST_ID = "695fe49be77fdfee933f0816";

// 1. Get your single record by id
async function testGetSingle(){
    try{
        const response = await fetch(`http://localhost:3000/income/${TEST_ID}`);
        if (!response.ok){
            console.error("HTTP error", response.status);
            return;
        }
        const data = await response.json();
        console.log(" Single record:", data);
}catch (error){
    console.error("GET single error:", error.message);
}
  }
// // call tbe function
testGetSingle();
// 2. get all records for freelancer
// const fetch = require("node-fetch");
// async function testGetAll(){
//     try{
//         const freelancerId = "F123";
//         const res = await fetch(`http://localhost:3000/income?freelancerId=${freelancerId}`);
//         const data = await res.json();
//         console.log("GET all records:", data);
//     }catch(err){
//         console.error("GET all Error:", err);
//     }
// }
// testGetAll()