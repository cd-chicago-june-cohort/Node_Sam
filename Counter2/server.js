var express = require("express");
var app = express();
var session = require('express-session');
var path = require("path");

app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'})); 
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render("index");
});


var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('add_one', function (data){
        var click_num = parseInt(data.click_total);
        click_num+=1;
        io.emit('add_one_response', {response_total: click_num});
    });
    socket.on('reset', function (){
        var click_num = 0;
        io.emit('reset_response', {reset: click_num});
    });
});