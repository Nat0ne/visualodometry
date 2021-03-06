'use strict';

var express = require('express');
var app = express();
var fs = require("fs");
//const { exec } = require('child_process');
const shell = require('shelljs')


/*
var math = require('./math')
var result = null;

const cors = require('cors')({origin: true});
*/

/*
exec('echo blabalb', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});*/

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function ls() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      //console.log( data );
      res.end( data );
  
   /*
   result = math.add(7, 2);
   res.end( '7+2='+result );
   */
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.get('/id1=:id1&id2=:id2', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user1 = users["user" + req.params.id1]
      var user2 = users["user" + req.params.id2]
      console.log(user1);
      console.log(user2);
      res.end(JSON.stringify(user1) + JSON.stringify(user2));
   });
})

app.get('/:test', function (req, res) {
    shell.exec('./path_to_your_file');
})




var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
