// Name: ashwink.20@ichat.sp.edu.sg
// Admin: P2021656
// Class: DISM/FT/2B/22

var app = require('./controller/app.js');

var port=8081

var server = app.listen(port, function () {
   console.log('Web App Hosted at http://localhost:%s',port);
});