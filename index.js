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
app.use(require('body-parser').json());
const limiter = rateLimit({
  windowMs : 10*60*1000,//window size is 10 minutes
  max: 20,//max request 5 in 10 minutes
  message: 'You have exceeded the max number of request available in 10 minutes. Please try again'
});

app.use(limiter);
app.set('trust proxy',1);//read in docs what is trust proxy great explanation there

//routes
app.use('/api',require('./routes/index'));

app.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`);
});