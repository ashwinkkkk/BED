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
                console.log("Inside movie.js insert Error:", err);
                return callback(err, null);
            } else {  
                const insertUserQuery = 
                `
                INSERT INTO movie (title, description, cast, time, opening_date) VALUES (?, ?, ?, ?, ?);
                `
                dbConn.query(insertUserQuery, [user.title, user.description, user.cast, user.time, user.opening_date], (error, results) => {
                    if (error) {
                        return callback(error, null);
                    } else {
                        console.log("Results insertid is ",results.insertId)
                        return callback(null, results.insertId)
                    }
                })
            }
        });
    },
    // ENDPOINT 9 GET /movie/:id
    findById: function(id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside movie.js findByID Error:", err);
                return callback(err, null);
            } else {          
                const findMovieByIDQuery = "select movie.movieid, movie.title, movie.description, movie.cast, movie.time, movie.opening_date, genre.genre FROM movie, genre, genrelisting WHERE movie.movieid=genrelisting.movie_id and movie.movieid=? and genre.genreid=genrelisting.genre_id";
                dbConn.query(findMovieByIDQuery, [id], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    } else if (results = []) {
                        error = "no such movie"
                        return callback(error, null);
                    } else {
                        console.log("Inside user.js findByID Results:", results);
                        var i;
                        allGenre = []
                        for (i=0; i<results.length; i++){
                            allGenre.push(results[i].genre)
                        }
                        console.log(allGenre)
                        var j;
                        for (j=0; j<allGenre.length; j++) {
                            if (j>0){
                                results[0].genres = results[0].genres + "," + allGenre[j]
                            }
                            else {
                                console.log("here in else if j=0", allGenre[0])
                                results[0].genres = allGenre[j]
                            }
                        }
                        console.log(results)
                        delete results[0].genre
                        return callback(null, results[0])
                    }
                });
            }
        });
    },
    // ENDPOINT 8 GET /movie/
    findAll: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside moive.js findAll Error:", err);
                return callback(err, null);
            } else {                   
                const findAllQuery = "SELECT * FROM movie order by title ASC;";
                dbConn.query(findAllQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else if (results.length == 0) {
                        return callback(null, null);
                    } else {
                        console.log("Inside movie.js findAll Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },
    delete: function(name, callback) {
        console.log("HEre in deleteing movie")
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside movie.js delete Error:", err);
                return callback(err, null);
            } else {
                console.log("name is ",name)
                const deleteMovieByIDQuery = "DELETE FROM movie WHERE title = ?;";
                dbConn.query(deleteMovieByIDQuery, [name], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else if (results.affectedRows == 0) {
                        error = "no such movie"
                        return callback(error, null);
                    } else {
                        console.log("Inside movie.js delete Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },
    findID: function(name, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside moive.js findID Error:", err);
                return callback(err, null);
            } else {                   
                const findAllQuery = "SELECT movieid FROM movie where title = ?;";
                dbConn.query(findAllQuery, [name], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else if (results.length == 0) {
                        return callback(null, null);
                    } else {
                        console.log("Inside movie.js findID Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },
    insertGenre: function(movieid, user, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside movie.js insert Error:", err);
                return callback(err, null);
            } else {
                listOfGenre = user.genre.split(",")
                console.log("Here doing first select!")
                const sql =
                `
                SELECT genreid FROM genre WHERE genre = ?;
                `;
                listOfGenreID = []
                for (var i = 1; i<listOfGenre.length; i++){
                    dbConn.query(sql,[listOfGenre[i]],(error, results) => {
                        if (error) {
                            return callback(error, null);
                        } else{
                            console.log("REsults from previous select is ", results[0].genreid)
                            listOfGenreID.push(results[0].genreid)
                            var sql2 = `INSERT into genrelisting (genre_id, movie_id) VALUES (?,?)`
                            dbConn.query(sql2, [results[0].genreid, movieid], (error3, resultLast)=>{
                                console.log("INSERTEEDDD!!", resultLast)
                            })
                        }
                    });
                }
            }
        });
    },
    findSearch: function(user, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside movie.js findSearch Error:", err);
                return callback(err, null);
            } else {
                search = user.search;
                console.log(search)
                listOfGenre = user.genre.split(",")
                console.log("Here doing first select!")
                const sql =
                `
                SELECT genreid FROM genre WHERE genre = ?;
                `;
                console.log("List of genre", listOfGenre)
                stringOfGenreID = ""
                
                console.log("list of gerne length is ", listOfGenre.length)
                if(listOfGenre[0] == "") {
                    listOfGenre = []
                }
                console.log("list of genr is ",listOfGenre)
                if(listOfGenre.length > 0) {
                    for (var i = 0; i<listOfGenre.length; i++){
                    console.log("list of genre id [i", i)
                    dbConn.query(sql,[listOfGenre[i]],(error, results) => {
                        if (error) {
                            return callback(error, null);
                        } else{
                            console.log("REsults from previous select is ", results[0].genreid)
                            stringOfGenreID = stringOfGenreID + "," + results[0].genreid
                            console.log("string of genre id is ===",stringOfGenreID)
                        }
                    });
                }
                    function returningString() {
                        console.log(stringOfGenreID)
                        stringOfGenreID = stringOfGenreID.substring(1);
                        parseInt(stringOfGenreID)
                        console.log(stringOfGenreID)
                        console.log("search is ", search)
                        sql2 = `select movie.title from movie, genre, genrelisting where movie.title like "%${search}%" and genrelisting.genre_id IN (${stringOfGenreID}) and genre.genreid = genrelisting.genre_id and movie.movieid = genrelisting.movie_id group by movie.title`
                        dbConn.query(sql2, [search, stringOfGenreID], (error3, result3) => {
                            console.log(result3)
                            console.log(sql2)
                            console.log(error3)
                            return callback(null, result3)
                        })
                    }
                    setTimeout(returningString, 1000)
                }
                else {
                    console.log("Here in no genre selection")
                    sql3 = `select movie.title from movie where movie.title like "%${search}%"`
                    dbConn.query(sql3, [search], (error4, result4) => {
                        console.log(result4)
                        console.log(sql3)
                        console.log(error4)
                        return callback(null, result4)
                    })
                }
                
                
                
                
            }
        });
    },
    findID2: function(name, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside moive.js findID Error:", err);
                return callback(err, null);
            } else {                   
                const findAllQuery = "SELECT title, time FROM movie where title = ?;";
                dbConn.query(findAllQuery, [name], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else if (results.length == 0) {
                        return callback(null, null);
                    } else {
                        console.log("Inside movie.js findID Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },
    findID3: function(name, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside moive.js findID Error:", err);
                return callback(err, null);
            } else { 
                name = name.substring(1);              
                console.log("name is", name)    
                const findAllQuery = "SELECT movie.movieid, movie.description, movie.cast, movie.opening_date, movie.time, genre.genre FROM movie, genrelisting, genre where movie.title = ? and genre.genreid = genrelisting.genre_id and movie.movieid = genrelisting.movie_id;";
                dbConn.query(findAllQuery, [name], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("error is ",error)
                        return callback(error, null);
                    } else if (results.length == 0) {
                        console.log("result is null", results)
                        return callback(null, null);
                    } else {
                        console.log("Inside movie.js findID Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },
    edit: function(user, name, callback) {
        console.log("Here in edit of movie")
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside movie.js findAll Error:", err);
                return callback(err, null);
            } else {                   
                const sql = "UPDATE movie SET ? WHERE title = ?;";
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
    editGenre: function(user, name, callback) {
        console.log("Here in edit of moviegenre")
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside movie.js findAll Error:", err);
                return callback(err, null);
            } else {                   
                const sql = "SELECT movieid from movie where title = ?;";
                console.log(user)
                dbConn.query(sql, [name], (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    } else if (results.length == 0) {
                        return callback(null, null);
                    } else {
                        console.log("Inside user.js findAll Results:", results[0].movieid);
                        const sql2 = "delete from genrelisting where movie_id = ?"
                        dbConn.query(sql2, [results[0].movieid])
                        movieid = results[0].movieid
                        stringOfGenre = user.genre
                        console.log(stringOfGenre)
                        listOfGenre = stringOfGenre.split(",");
                        console.log(listOfGenre)
                        const sql =
                        `
                        SELECT genreid FROM genre WHERE genre = ?;
                        `;
                        listOfGenreID = []
                        for (var i = 0; i<listOfGenre.length; i++){
                            dbConn.query(sql,[listOfGenre[i]],(error, results) => {
                                if (error) {
                                    return callback(error, null);
                                } else{
                                    console.log("REsults from previous select is ", results[0].genreid)
                                    listOfGenreID.push(results[0].genreid)
                                    var sql2 = `INSERT into genrelisting (genre_id, movie_id) VALUES (?,?)`
                                    dbConn.query(sql2, [results[0].genreid, movieid], (error3, resultLast)=>{
                                        console.log("INSERTEEDDD!!", resultLast)
                                        
                                    })
                                }
                            });
                        }
                        return callback(null, null)
                    }
                });
            }
        });
    }
}
