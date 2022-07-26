const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const needle = require('needle');
router.get('/',(req,res) => {
  res.send("Hello World");
});

router.post('/',async (req,res)=>{
  const data = {
    "code":req.body.code,
    "language":req.body.language,
    "stdin":req.body.stdin,
  };
  try{
    const result = await needle("post",process.env.API_BASE_URL,data);
    res.send(result.body);
  }catch(err){
    // console.log(err);
    res.send({"status":500});
  }
})

module.exports = router; 