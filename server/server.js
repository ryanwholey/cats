var express = require('express');
var app = express();
var parser = require('body-parser');
var path = require('path');
var host = process.env.host || 'localhost';
var port = process.env.port || '8000';
var request = require('request-promise');
var morgan = require('morgan');


if(host==='localhost'){
  
  app.use(function(req, res, next) {
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Credentials", false);
      res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, X-Access-Token, Content-Type, Accept, id");
      res.status(200).send();
      return;
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', "Origin, X-Access-Token, X-Requested-With, Content-Type, Accept, id");
      next();
    }
  });
}

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.use(morgan('dev'))

app.use(express.static(path.resolve(__dirname, './../build')));

app.get('/pics', function(req, res){
  request('http://thecatapi.com/api/images/get?format=xml&results_per_page=25')
    .then(function(imagesXML){
      res.status(200).send(imagesXML);
    })
    .catch(function(err){
      res.status(500).send('server request error' + JSON.stringify(err));
    })
});

app.get('/facts', function(req, res){
  request('http://catfacts-api.appspot.com/api/facts?number=25')
    .then(function(facts){
      res.status(200).send(facts);
    })
    .catch(function(err){
      res.status(500).send('server request error' + JSON.stringify(err));
    });
});

app.listen(port, function(){
  console.log('Hello human!! ^_^ Serving on ' + host + ':' + port);
});
