const express = require('express');//express module -> lightweight framework for handling requests
const cors = require('cors');//cors module -> helps to enable cors request
const bodyParser = require('body-parser');//body-parser for parsing the request object to get params
const rateLimit = require('express-rate-limit');

//needle module -> for making http request to base url(used in routes/index.js)

require('dotenv/config');//for env variables which would be available at runtime

//it's going to first see if already some env port variable is there or else it will use 5000 port number
const PORT = process.env.PORT || 5000

//make instance of app
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs : process.env.WINDOW_SIZE_IN_MINUTES*60*1000,//window size
  max: process.env.MAX_REQUEST_PER_USER,//max request per user
  message: `You have exceeded the max number of request available. Please try after ${process.env.WINDOW_SIZE_IN_MINUTES} later`
});

app.use(limiter);
app.set('trust proxy',1);//read in docs what is trust proxy great explanation there

//to put server in maintainance mode without code change and by only env variables in heroku
if(process.env.SERVER_IN_MAINTAINANCE === "true"){
  app.get('/*',(req,res) => {
    res.statusMessage = `Server in maintainance. Will be up by ${process.env.SERVER_IN_MAINTAINANCE_UNTIL_TIME}`;
    res.sendStatus(503);
  });
  app.post('/*',(req,res) => {
    res.statusMessage = `Server in maintainance. Will be up by ${process.env.SERVER_IN_MAINTAINANCE_UNTIL_TIME}`;
    res.sendStatus(503);
  });

}



app.get('/ping',(req,res)=>{
  res.json({"status":200});
})

//routes
app.use('/api',require('./routes/index'));

app.listen(PORT,() => {
  // console.log(`Server is running on ${PORT}`);
});

export default app;