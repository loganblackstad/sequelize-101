/* 

var Sequelize = require("sequelize");
var pg = require("pg");

module.exports.init = function (callback) {
  var dbName = "music_db",
    username = "postgres",
    password = "postgres",
    host = "localhost";

  var conStringPri =
    "postgres://" + username + ":" + password + "@" + host + "/postgres";
  var conStringPost =
    "postgres://" + username + ":" + password + "@" + host + "/" + dbName;

  // connect to postgres db
  pg.connect(conStringPri, function (err, client, done) {
    // create the db and ignore any errors, for example if it already exists.
    client.query("CREATE DATABASE " + dbName, function (err) {
      //db should exist now, initialize Sequelize
      var sequelize = new Sequelize(conStringPost);
      console.log(sequelize);
      callback(sequelize);
      client.end(); // close the connection
    });
  });
}; 

*/

var pgtools = require("pgtools");

// This can also be a connection string
// (in which case the database part is ignored and replaced with postgres)

const config = {
  user: "postgres",
  password: "postgres",
  port: 5432,
  host: "localhost",
};

pgtools.createdb(config, "test-db", function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});

pgtools.createdb(config, "music-db", function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});

pgtools.dropdb(config, "test-db", function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});

// a promise API is also available if cb is omitted
