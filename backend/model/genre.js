// Name: Ashwin kavidasan
// Admin: P2021656
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");

module.exports = {
    // ENDPOINT 5 POST/genre user.insert(user, callback) >>> done
    insert: function(user, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside genre.js insert Error:", err);
                return callback(err, null);
            } else {  
                const sql =
                `
                SELECT * FROM genre WHERE genre = ?;
                `;
                dbConn.query(
                    sql,
                    [user.genre],
                    (error, results) => {
                        if (error) {
                            return callback(error, null);
                        } else if(results.length == 0) {
                            console.log("inside results.length = 0", results)
                            const insertUserQuery = `INSERT INTO genre (genre, description) VALUES (?, ?);`;
                            dbConn.query(
                                insertUserQuery,
                                [user.genre, user.description],
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
                            error2 = "Genre already exists"
                            console.log(error2)
                            return callback(error2, null)
                        }
                });
            }
        });
    },
    // ENDPOINT 6 GET /genre
    findAll: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside genre.js findAll Error:", err);
                return callback(err, null);
            } else {                   
                const findAllQuery = "SELECT * FROM genre;";
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
    findByName: function(genreName, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside user.js findByID Error:", err);
                return callback(err, null);
            } else {  
                const sql =
                `
                SELECT genreid FROM genre WHERE genre = ?;
                `;
                dbConn.query(
                    sql,
                    [genreName],
                    (error, results) => {
                        if (error) {
                            return callback(error, null);
                        } else {
                            console.log("genreid is ",results[0].genreid)
                            const sql2 = `select genrelisting.movie_id, movie.title, movie.time from movie, genrelisting where genre_id = ? and genrelisting.movie_id = movie.movieid`;
                            dbConn.query(
                                sql2,
                                [results[0].genreid],
                                (error2, resultOfFinalQuery) => {
                                    dbConn.end();
                                    if (error2) {
                                        console.log(error2)
                                        return callback(error2, null);
                                    } else {
                                        console.log(resultOfFinalQuery)
                                        return callback(null, resultOfFinalQuery)
                                    }
                            });
                        }
                });
            }
        });
    },
    edit: function(user, name, callback) {
        console.log("Here in edit of genre")
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside genre.js findAll Error:", err);
                return callback(err, null);
            } else {                   
                const sql = "UPDATE genre SET ? WHERE genre = ?;";
                console.log(user)
                dbConn.query(sql, [user, name], (error, results) => {
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
    delete: function(name, callback) {
        console.log("HEre in deleteing genre")
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside genre.js delete Error:", err);
                return callback(err, null);
            } else {
                console.log("name is ",name)
                const deleteMovieByIDQuery = "DELETE FROM genre WHERE genre = ?;";
                dbConn.query(deleteMovieByIDQuery, [name], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else if (results.affectedRows == 0) {
                        error = "no such movie"
                        return callback(error, null);
                    } else {
                        console.log("Inside genre.js delete Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    }
}
