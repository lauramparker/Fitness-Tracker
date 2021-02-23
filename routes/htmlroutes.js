const path = require("path");

module.exports = function(app, path) {
    //route to render HOMEPAGE (index)
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //route to render EXERCISE page for user input
    app.get("/exercise", function(req, res){
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    //route to render STATS page
    app.get("/stats", function(req, res){
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    });
};