// Name: Ashwin kavidasan
// Admin: P2021656
// Class: DISM/FT/2B/22


var express = require('express');
var app = express();
var user = require('../model/user.js');
var movie = require('../model/movie.js'); 
var review = require('../model/review.js'); 
var genre = require('../model/genre.js'); 
var screening = require('../model/screening.js'); 
var verifyToken=require('../auth/verifyToken.js');
var cors = require('cors');
app.options('*',cors());
app.use(cors())

app.use(express.json());// parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

app.use(express.static("public"))
app.post('/api/login',function(req, res){
    var email=req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function(err, token, result, type){
        if(!err){
            res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              delete result[0]['password'];//clear the password in json data, do not send back to client
              console.log(result);
            res.json({success: true, UserData: JSON.stringify(result), token:token, type: type, status: 'You are successfully logged in!'}); 
            res.send();
        }else{
            res.status(500);
            res.send(err.statusCode);
        }
    }); 
});


//Endpoint3: GET /users/:id/
app.get('/users/:id/', function (req, res) {
    const id = parseInt(req.params.id);
    user.findByID(id, function (err, result) {
        if (err == "no such user"){
            res.sendStatus(500)
        }else if (!err) {
            console.log(err)
            res.status(200).send(result);
        } else {
            res.sendStatus(500);
        }
    });
});

// Endpoint2: GET /users/
app.get('/users/', function (req, res) {
    user.findAll(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.sendStatus(500);
        }
    });
});

// Endpoint1 POST /users/
app.post('/users/', verifyToken, (req, res) => {
    user.insert(req.body, function (err, result) {
        if (!err) {
            res.status(201).send(`{"userid":${result}}`);
        } else if(err == "Username already exists"){
            res.sendStatus(422);
        } else{
            res.sendStatus(500);
        }
    });
});

// Endpoint 4 PUT /users/:id/
app.put('/users/:id/', (req, res) => {
    const userid = parseInt(req.params.id);
    user.edit(req.body, userid, function (err, result) {
        if (!err) {
            res.sendStatus(204);
        } else if (err=="Username already exists") {
            console.log("err in app.js", err)
            res.sendStatus(422);
        } else{
            res.sendStatus(500);
        }
    });
});


// ENDPOINT 5 POST /genre
app.post('/genre', verifyToken, (req, res) => {
    if (req.type == "A") {
        console.log("user is admin")
        genre.insert(req.body, function (err, result) {
        if (!err) {
            res.sendStatus(204);
        } else if(err == "Genre already exists"){
            res.sendStatus(422);
        } else{
            res.sendStatus(500);
        }
    });
    }
    
});

// ENDPOINT 6 GET /genre
app.get('/genre', function (req, res) {
    genre.findAll(function (err, result) {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log("result in app.js",result);
            res.json({success: true, UserData: JSON.stringify(result), status: 'You are successfully logged in!'}); 
            
        } else {
            res.sendStatus(500);
        }
    });
});

// ENDPOINT 7 POST/movie/
app.post('/movie', verifyToken, (req, res) => {
    if (req.type == "A") {
        console.log("Here in app.post movie req.type is A")
        movie.insert(req.body, function (err, result) {
        if (!err) {
            console.log("here in app.js no error")
            console.log(result)
            res.status(201).send(`{"movieid":${result}}`);
        } else{
            console.log("Here in app.js error",err)
            console.log("Here in app.js error place, result is ", result)
            res.sendStatus(500);
        }
    });
    }
    
});

// ENDPOINT 9 GET /movie/:id
app.get('/movie/:id', function (req, res) {
    const id = parseInt(req.params.id);
    movie.findById(id, function (err, result) {
        if (err == "no such movie"){
            res.sendStatus(500)
        }else if (!err) {
            res.status(200).send(result);
        } else {
            res.sendStatus(500);
        }
    });
});

// ENDPOINT 8 GET /movie/
app.get('/movie', function (req, res) {
    movie.findAll(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.sendStatus(500);
        }
    });
});

// ENDPOINT 10 DELTED /movie/:id/
app.delete('/movie/:name', function (req, res) {
    const movieName = req.params.name;
    console.log("moviename in app.js is ", movieName)
    movie.delete(movieName, function (err, result) {
        if (err == "no such movie") {
            console.log("in app.js", err)
            res.sendStatus(500)
        }else if (!err) {
            res.sendStatus(204);
        } else {
            console.log(err)
            res.sendStatus(500);
        }
    });
});

// ENDPOINT 11: POST /movie/:id/review/
app.post('/movie/:id/review/', verifyToken, (req, res) => {
    console.log("Inside app.post review app.js")
    console.log(">>>>>>",req.type)
    const id = parseInt(req.params.id);
    if (req.type=="RM") {
        review.insert(id, req.body, function (err, result) {
        if (!err) {
            console.log(result)
            res.status(201).send(`{"reviewid":${result.insertId}}`);
        } else{
            res.sendStatus(500);
        }
    });
    }
    
});


// Endpoint 12 GET /movie/:id/reviews
app.get('/movie/:id/reviews', function (req, res) {
    const id = parseInt(req.params.id);
    console.log("Here in app.js")
    review.findAll(id, function (err, result) {
        if (err == "no result") {
            res.sendStatus(500)
        }else if (!err) {
            console.log("Hree in else if", err)
            res.status(200).send(result);
        } else{
            console.log(error)
            res.sendStatus(500);
        }
    });
});

// ADDITIONAL FEATURE SCREENING: POST /screening/:id
app.post('/screening/:id', (req, res) => {
    const id = parseInt(req.params.id);
    screening.insert(id, req.body, function (err, result) {
        if (!err) {
            res.sendStatus(201);
        } else{
            res.sendStatus(500);
        }
    });
});


// ADDITIONAL FEATURE SCREENING: GET /screening/:id
app.get('/screening/:id', function (req, res) {
    const id = parseInt(req.params.id);
    console.log("Here in app.js")
    screening.findByID(id, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else{
            console.log(error)
            res.sendStatus(500);
        }
    });
});


// ADDITIONAL FEATURE PUT /screening
app.put('/screening', (req, res) => {
    screening.edit(req.body, function (err, result) {
        if (!err) {
            console.log(result)
            res.sendStatus(204);
        } else{
            res.sendStatus(500);
        }
    });
});

// ADDITIONAL FEATURE DELETE /screenign/:screeningid
app.delete('/screening/:screeningid', function (req, res) {
    const screeningid = parseInt(req.params.screeningid);
    screening.delete(screeningid, function (err, result) {
        if (!err && result !== null) {
            res.status(200).send(result.affectedRows + " row(s) deleted");
        } else {
            res.status(500).send("Some error");
        }
    });
});

app.get('/genre/:genreName', function (req, res) {
    const genreName = req.params.genreName;
    console.log("genreName", genreName)
    genre.findByName(genreName, function (err, result) {
        if (err == "no result") {
            res.sendStatus(500)
        }else if (!err) {
            console.log("Hree in else if", err)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log("result in app.js", result);
            res.json({success: true, UserData: JSON.stringify(result), status: 'You are successfully logged in!'}); 
        } else{
            console.log(err)
            res.sendStatus(500);
        }
    });
});

app.get('/movieName/:name', function (req, res) {
    const name = req.params.name;
    console.log("Here in app.js")
    movie.findID(name, function (err, result) {
        if (err == "no result") {
            res.sendStatus(500)
        }else if (!err) {
            console.log("Hree in else if", err)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log(result);
            res.json({success: true, movieData: JSON.stringify(result), status: 'Gotten movieid from name!'}); 
        } else{
            console.log(error)
            res.sendStatus(500);
        }
    });
});

app.post('/genreListing/:movieid', (req, res) => {
    const movieid = parseInt(req.params.movieid);
    console.log("request body is ", req.body)
    movie.insertGenre(movieid, req.body, function (err, result) {
        if (!err) {
            res.sendStatus(201);
        } else{
            res.sendStatus(500);
        }
    });
});

app.post('/movieSearch', function (req, res) {
    console.log("Here in app.js")
    movie.findSearch(req.body, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else{
            console.log(error)
            res.sendStatus(500);
        }
    });
});

app.get('/movieName2/:name', function (req, res) {
    const name = req.params.name;
    console.log("Here in app.js")
    movie.findID2(name, function (err, result) {
        if (err == "no result") {
            res.sendStatus(500)
        }else if (!err) {
            console.log("Hree in else if", err)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log(result);
            res.json({success: true, movieData: JSON.stringify(result), status: 'Gotten movieid from name!'}); 
        } else{
            console.log(error)
            res.sendStatus(500);
        }
    });
});

app.get('/movieName3/:name', function (req, res) {
    const name = req.params.name;
    console.log("Here in app.js")
    movie.findID3(name, function (err, result) {
        if (err == "no result") {
            res.sendStatus(500)
        }else if (!err) {
            console.log("Hree in else if", err)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log(result);
            res.json({success: true, movieData: JSON.stringify(result), status: 'Gotten movieid from name!'}); 
        } else{
            console.log(error)
            res.sendStatus(500);
        }
    });
});

app.put('/movieUpdate/:name', verifyToken, (req, res) => {
    movieName = req.params.name;
    if (req.type=="A") {
        movie.edit(req.body, movieName, function (err, result) {
        if (!err) {
            res.sendStatus(204);
        } else{
            res.sendStatus(500);
        }
    });
    }
});

app.put('/genreUpdate/:name',verifyToken, (req, res) => {
    genreName = req.params.name;
    if (req.type == "A") {
        genre.edit(req.body, genreName, function (err, result) {
        if (!err) {
            res.sendStatus(204);
        } else{
            res.sendStatus(500);
        }
    });
    }
    
});

app.delete('/genre/:name', verifyToken, function (req, res) {
    const genreName = req.params.name;
    console.log("genrename in app.js is ", genreName)
    if (req.type == "A"){
        genre.delete(genreName, function (err, result) {
        if (err == "no such movie") {
            console.log("in app.js", err)
            res.sendStatus(500)
        }else if (!err) {
            res.sendStatus(204);
        } else {
            console.log(err)
            res.sendStatus(500);
        }
    });
    }
    
});

app.post('/movieUpdateGenre/:name', verifyToken, (req, res) => {
    movieName = req.params.name;
    if (req.type=="A") {
        movie.editGenre(req.body, movieName, function (err, result) {
        if (!err) {
            res.sendStatus(204);
        } else{
            res.sendStatus(500);
        }
    });
    }
});

app.get('/checkTokenType',verifyToken, function (req, res) {
    res.send(req.type)
});
app.get('/checkTokenUserid',verifyToken, function (req, res) {
    res.json({success: true, data: JSON.stringify(req.userid)}); 

});
module.exports = app
