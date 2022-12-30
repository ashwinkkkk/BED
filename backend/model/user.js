// Name: ashwin kavidasan
// Admin: P2021656
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");
var config=require('../config.js'); 
var jwt=require('jsonwebtoken');

module.exports = {
    loginUser: function (emailOrUsername, password, callback) {

        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = 'SELECT * FROM user WHERE (email=? OR username=?) and password=?';

                conn.query(sql, [emailOrUsername, emailOrUsername, password], function (err, result) {
                    conn.end();

                    if (err) {
                        console.log("Err: " + err);
                        return callback(err, null, null);
                    } else {
                        var token = "";
                        var i;
                        if (result.length == 1) {

                            token = jwt.sign({ id: result[0].userid, type: result[0].type }, config.key, {
                                expiresIn: 86400 //expires in 24 hrs
                            });
                            console.log("@@token " + token);
                            return callback(null, token, result, result[0].type);


                        } else {
                            var err2 = new Error("UserID/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }
                    }  //else
                });
            }
        });
    },
    //ENDPOINT 3 GET/users/:id user.findByID(id, callback) >>> done
    findByID: function(id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside user.js findByID Error:", err);
                return callback(err, null);
            } else {          
                const findUserByIDQuery = "SELECT userid, username, email, contact, type, profile_pic_url, created_at FROM user WHERE userid = ?;";
                dbConn.query(findUserByIDQuery, [id], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    } else if (results = []) {
                        error = "no such user"
                        return callback(error, null);
                    } else {
                        console.log("Inside user.js findByID Results:", results);
                        return callback(null, results[0]);  
                    }
                });
            }
        });
    },

    // ENDPOINT 2 GET/users/ user.findAll(callback) >>> done
    findAll: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside user.js findAll Error:", err);
                return callback(err, null);
            } else {                   
                const findAllQuery = "SELECT userid, username, email, contact, type, profile_pic_url, created_at FROM user;";
                dbConn.query(findAllQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else if (results.length == 0) {
                        return callback(null, null);
                    } else {
                        console.log("Inside user.js findAll Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },

    // ENDPOINT 1 POST/users/ user.insert(user, callback) >>> done
    insert: function(user, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside user.js insert Error:", err);
                return callback(err, null);
            } else {  
                const sql =
                `
                SELECT * FROM user WHERE username = ?;
                `;
                dbConn.query(
                    sql,
                    [user.username],
                    (error, results) => {
                        if (error) {
                            return callback(error, null);
                        } else if(results.length == 0) {
                            console.log("inside results.length = 0", results)
                            const insertUserQuery = `INSERT INTO user (username, email, contact, password, type, profile_pic_url) VALUES (?, ?, ?, ?, ?, ?);`;
                            dbConn.query(
                                insertUserQuery,
                                [user.username, user.email, user.contact, user.password, user.type, user.profile_pic_url],
                                (error, resultOfInsert) => {
                                    dbConn.end();
                                    if (error) {
                                        console.log(error)
                                        return callback(error, null);
                                    } else {
                                        return callback(null, resultOfInsert.insertId)
                                    }
                            });
                        } else {
                            console.log(results)
                            error2 = "Username already exists"
                            console.log(error2)
                            return callback(error2, null)
                        }
                });
            }
        });
    },

    // ENDPOINT 4 user.edit(user, userID, callback)
    edit: function(user, userid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside user.js insert Error:", err);
                return callback(err, null);
            } else {  
                const sql =
                `
                SELECT * FROM user WHERE username = ?;
                `;
                dbConn.query(
                    sql,
                    [user.username],
                    (error, results) => {
                        if (error) {
                            return callback(error, null);
                        } else if(results.length == 0) {
                            console.log("inside results.length = 0", results)
                            const updateUserQuery = `UPDATE user SET ? WHERE userid = ?;`;
                            dbConn.query(
                                updateUserQuery,
                                [user, userid],
                                (error, resultOfUpdate) => {
                                    dbConn.end();
                                    if (error || resultOfUpdate.affectedRows == 0) {
                                        error = "Other errors"
                                        console.log("error here is ",error)
                                        return callback(error, null);
                                    } else {
                                        console.log("Resutl of update is ", resultOfUpdate.affectedRows)
                                        return callback(null, resultOfUpdate.affectedRows)
                                    }
                            });
                        } else {
                            console.log(results)
                            error2 = "Username already exists"
                            console.log(error2)
                            return callback(error2, null)
                        }
                });
            }
        });
    }

}
