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
    res.redirect("results");
});

app.get('/results', function(req, res) {
    res.render("results", {"info" : req.session.info});
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});