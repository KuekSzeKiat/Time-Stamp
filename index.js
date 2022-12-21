// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// get date API
app.get("/api/:date?", function(req, res){
  const time = req.params.date;
  let date;

  if(!time){ // check if string is empty
    date = new Date();
  } else if(!isNaN(time)) { // check if string is milliseconds format
    date = new Date(parseInt(time)); //utc format
  } else {
    date = new Date(time) // if string is in valid format, return date in utc format, else return invalid date 
  }

  if(date.toString() === "Invalid Date"){
    res.json({ error: date.toString() })
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString()})
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
