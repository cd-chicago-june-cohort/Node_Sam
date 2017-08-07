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
    res.render("index", {chats: chats});
});

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

var users = [];
var chats = [];
var exit_count = 0;

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  console.log(exit_count);
  socket.on('new_user', function(data) {
      exit_count = 0;
      var new_user = {name: data.user, id: socket.id};
      users.push(new_user);
      var user_str = new_user.name + " has entered the chat room."
      var user_msg = {content: user_str, speaker: ""}
      chats.push(user_msg);
      socket.broadcast.emit('enter_user', {user: data.user})
  });

  socket.on('new_message', function(data){
    var speaker_str = data.speaker + ": ";
    var msg = {content: data.message, speaker: speaker_str};
    chats.push(msg);
    io.emit('show_message', {new_msg: msg.content, speaker: msg.speaker});
  });

  socket.on('leave_chat', function(data){
      exit_count += 1;
      var user_str = data.user + " has left the chat room.";
      var user_msg = {content: user_str, speaker: ""};
      if (exit_count == 2) {
            chats.push(user_msg);
      }
      socket.broadcast.emit('show_leave', {user: data.user, exit_count : exit_count});
  });

  socket.on("reset", function(){
        exit_count = 1;
  })

});