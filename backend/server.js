const express= require('express');
require('dotenv').config();

//express app
const app= express();
//Routes 
app.get('/',(req,res)=>{
  res.json({message:'Welcome to the app'})
})

//Listen for requests
app.listen(process.env.PORT,()=>{

  console.log(`Listening on port ${process.env.PORT}`);
})