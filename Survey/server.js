var express = require("express");
var app = express();
var session = require('express-session');
var path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'})); 
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    req.session.info = {};
    res.render("index");
});

app.post('/process', function(req, res) {
    survey_info = req.body;
    req.session.info = {
        'name' : survey_info.name,
        'loc' : survey_info.loc,
        'lang' : survey_info.lang,
        'comment' : survey_info.comment
    }
    res.redirect("/");
});

// app.get('/results', function(req, res) {
//     res.render("results", {"info" : req.session.info});
// });

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);

  socket.on("survey_submitted", function(data){
      console.log(data.message);
      var randnum = Math.floor(Math.random() * 1000) + 1;
      var obj_str = JSON.stringify(data.message);
      var message_str = 'You emitted the following information to the server: ' + obj_str; 
      var num_str = 'Your lucky number emitted by the server is ' + randnum +'.'; 
      socket.emit( 'server_response', {response:  message_str, lucky_num: num_str});
  })
});