var mongoose = require('mongoose');

var dbURL = 'mongodb://localhost/Loc8r';
if(process.env.NODE_ENV === "production") {
    dbURL = "mongodb://kausaur:kausaur@ds029466.mlab.com:29466/loc8r";
}
mongoose.connect(dbURL);

var readline = require("readline");
if(process.platform === "win32") {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    //for Windows
    rl.on("SIGINT", function() {
        process.emit("SIGINT");
    });
    //if using nodemon
    rl.on("SIGUSR2", function() {
        process.emit("SIGUSR2");
    });
    //for heroku
    rl.on("SIGTERM", function() {
        process.emit("SIGTERM");
    });
}

mongoose.connection.on('connected', function() {
   console.log("Mongoose connected to: " + dbURL); 
});
mongoose.connection.on('error', function(err) {
   console.log("Mongoose connection error: " + err); 
});
mongoose.connection.on('disconnected', function() {
   console.log("Mongoose disconnected from: " + dbURL); 
});


var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through: " + msg);
        callback();
    })
};

process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    })
});

process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    })
});

process.on('SIGTERM', function() {
    gracefulShutdown('Heroku appshutdown', function() {
        process.exit(0);
    })
});


//require("./locations");