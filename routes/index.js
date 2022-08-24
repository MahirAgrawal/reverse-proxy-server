const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const needle = require('needle');
router.get('/',(req,res) => {
  res.send({status:"200"});
});

//to put server in maintainance mode with code change and by only env variables in heroku
if(process.env.SERVER_IN_MAINTAINANCE){
  router.post('/',(req,res) => {
    res.json({"status":"503","message":`Server in maintainance. Will be up by ${process.env.SERVER_IN_MAINTAINANCE_UNTIL_TIME}`});
  });
}

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
    res.send({"status":500});
  }
})

module.exports = router; 