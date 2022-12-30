// Name: Ashwin Kavidasan
// Admin: P2021656
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");

module.exports = {
    // ENDPOINT 11 POST/movie/:id/review/
    insert: function(id, user, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside review.js insert Error:", err);
                return callback(err, null);
            } else {  
                const sql =
                `
                SELECT * FROM reviews WHERE userid = ? and movieid = ?;
                `;
                dbConn.query(
                    sql,
                    [user.userid, id],
                    (error, results) => {
                        if (error) {
                            return callback(error, null);
                        } else if(results.length == 0) {
                            console.log("inside results.length = 0", results)
                            const updateUserQuery = `INSERT INTO reviews (movieid, userid, rating, review) VALUES (?, ?, ?, ?);`;
                            dbConn.query(
                                updateUserQuery,
                                [id, user.userid, user.rating, user.review],
                                (error, resultOfUpdate) => {
                                    dbConn.end();
                                    if (error || resultOfUpdate.affectedRows == 0) {
                                        error = "Other errors"
                                        console.log("error here is ",error)
                                        return callback(error, null);
                                    } else {
                                        return callback(null, resultOfUpdate)
                                    }
                            });
                        } else {
                            console.log(results)
                            error2 = "review already exists"
                            console.log(error2)
                            return callback(error2, null)
                        }
                });
            }
            
        });
    },
    findAll: function(id, callback) {
        var dbConn = db.getConnection();
        console.log("Here in findall")
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside review.js findAll Error:", err);
                return callback(err, null);
            } else { 
                console.log("Here in else")                  
                const findAllQuery = "SELECT reviews.movieid, reviews.userid, user.username, reviews.rating, reviews.review, reviews.created_at from reviews, user where reviews.userid=user.userid AND reviews.movieid=?";
                console.log("query executed")
                console.log("id is ", id)
                dbConn.query(findAllQuery, [id], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else if (results == []) {
                        console.log("REview.js err")
                        error = "no result"
                        console.log("results is ", results)
                        return callback(error, null);
                    } else {
                        console.log("Inside review.js findByID Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    }
}
