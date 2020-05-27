const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

// routes
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.get("/", (req, res) => {
  db.artist.findAll().then((results) => {
    res.json(results);
  });
});

app.get("/artist", (req, res) => {
  db.artist.findAll().then((results) => {
    res.json(results);
  });
});

app.post("/artist", (req, res) => {
  db.artist
    .create({
      artist_Name: req.body.name,
    })
    .then((result) => {
      res.send(result);
    });
});

app.put("/artist/:id", (req, res) => {
  db.artist
    .update(
      {
        artist_name: req.body.name,
      },
      { where: { id: req.params.id } }
    )
    .then(() => {
      db.artist.findByPk(req.params.id).then((result) => {
        res.json(result);
      });
    });
});

app.delete("/artist/:id", (req, res) => {
  db.artist
    .destroy({
      where: { id: req.params.id },
    })
    .then(() => {
      db.artist.findAll().then((results) => {
        res.json(results);
      });
    });
});

app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));

// db.user.findAll().then((results) => {
//   results.forEach((entry) => {
//     console.log(entry.id, entry.first_name);
//   });
// });

/* NODEMON

CLI commands:
npm install nodemon --save -g
nodemon app.js

notes:
rs  can be used to force restart node server
*/
