// Name: Ashwin kavidasan
// Admin: P2021656
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");

module.exports = {
    // Additional feature: post /screening/:id
    insert: function(id, info, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside screening.js insert Error:", err);
                return callback(err, null);
            } else {  
                var screeningslot = info.screeningslot.split(",")
                var sqlQuery = `INSERT INTO screening (movieid, screeningslot) VALUES (?, ?)`
                var i;
                for (i=0; i<screeningslot.length; i++){
                    console.log("Here in loop")
                    dbConn.query(sqlQuery, [id, screeningslot[i]], (error, results) => {
                        if (error) {
                            console.log(error)
                            return callback(error, null)
                        }
                    })
                }
                dbConn.end();
                return callback(null, null)
            }
        });
    },
    // ADDITIONAL FEATURE: get /screening/:id
    findByID: function(movieID, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside screening.js findByID Error:", err);
                return callback(err, null);
            } else {   
                const findScreeningByID = "SELECT * FROM screening WHERE movieid = ?;";
                dbConn.query(findScreeningByID, [movieID], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    } else if (results === null) {
                        return callback(null, null);
                    } else {
                        console.log("Inside screening.js findByID Results:", results);
                        screeningSlots = []
                        for (var i=0; i<results.length; i++) {
                            screeningSlots.push(results[i].screeningslot)
                        }
                        console.log('screeningSLots list', screeningSlots)
                        for (var j=0; j<screeningSlots.length; j++) {
                            if (j != 0) {
                                results[0].screeningSlotsList = results[0].screeningSlotsList + ", " +  screeningSlots[j]
                            } else {
                                results[0].screeningSlotsList = screeningSlots[j]
                            }
                        }
                        delete results[0].created_at
                        delete results[0].screeningid
                        delete results[0].screeningslot
                        console.log(results)
                        return callback(null, results[0])
                    }
                });
            }
        });
    },
    // ADDITIONAL FEATURE PUT /screening
    edit: function(screening, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside screening.js insert Error:", err);
                return callback(err, null);
            } else {  
                const editScreening =
                    `UPDATE screening
                    SET
                    screeningslot = ?
                    WHERE screeningid = ?
                    `;
                dbConn.query(editScreening, [screening.screeningslot, screening.screeningid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    } else {
                        return callback(null, results);
                    }
                });
            }
        });
    },
    delete: function(screeningid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log("Inside screening.js delete Error:", err);
                return callback(err, null);
            } else {
                const deleteScreeningByIDQuery = "DELETE FROM screening WHERE screeningid = ?;";
                dbConn.query(deleteScreeningByIDQuery, [screeningid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    } else {
                        console.log("Inside screening.js delete Results:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    }

}
