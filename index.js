var http = require('http');
var express = require('express');

var Twig = require('twig'), // Twig module
    twig = Twig.twig;       // Render function

var app = express();

app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});
app.set('view engine', 'twig');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {username: '1'});
});

app.get('/e', (req, res) => {
    res.render('index', {username: '2'});
});

http.createServer(app).listen(9000);