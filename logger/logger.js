const fs = require('fs');
const uuid = require('uuid');

var logger = function (req, res, next) {
    //attaches unique id with the request
    req.requestId = btoa(uuid.v4()).substring(0,10);

    //request
    data = `[${req.requestId}] ${req.method} ${req.hostname} ${JSON.stringify(req.body)}\n`;
    fs.writeFile('./logger/request.txt',data,{flag: 'a'},err=>{
        if(err){
            console.log(data);
        }
    });

    //attach function to response finish event to write response status too
    res.on('finish',()=>{
        data = `[${req.requestId}] ${res.statusCode} ${res.statusMessage}\n`;
        fs.writeFile('./logger/response.txt',data,{flag: 'a'},err=>{
            if(err){
                console.log(data);
            }
        });
    });
    next();
};
module.exports = logger;
