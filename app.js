const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", "views");
app.set("view engine", "ejs");

const db = require("./models");

app.use("/", indexRouter);
app.use("/users", usersRouter);

// routes
// Home page
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the music repo!</h1>`);
});

// Artists
// Get all Artists
app.get("/artists", (req, res) => {
  db.Artist.findAll().then((results) => {
    res.json(results);
  });
});

// Add an Artist
app.post("/artists", (req, res) => {
  db.Artist.create({
    Artist_Name: req.body.name,
  }).then((result) => {
    res.send(result);
  });
});

// Update an Artist
app.put("/artists/:id", (req, res) => {
  db.Artist.update(
    {
      Artist_Name: req.body.name,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    db.Artist.findByPk(req.params.id).then((result) => {
      res.json(result);
    });
  });
});

// Delete an Artist
app.delete("/artists/:id", (req, res) => {
  db.Artist.destroy({
    where: { id: req.params.id },
  }).then(() => {
    db.Artist.findAll().then((results) => {
      res.json(results);
    });
  });
});

// Albums
// Get all Albums
app.get("/albums", (req, res) => {
  db.Album.findAll().then((results) => {
    res.json(results);
  });
});

// Get all Albums by Artist
app.get("/artists/:id/albums", (req, res) => {
  db.Artist.findByPk(req.params.id)
    .then((Artist) => {
      return Artist.getAlbums();
    })
    .then((results) => {
      res.json(results);
    });
});

// Add an Album
app.post("/artists/:id/albums", (req, res) => {
  db.Album.create({
    Album_Name: req.body.name,
    Year: req.body.year,
    Artist_ID: req.params.id,
  }).then((result) => {
    res.send(result);
  });
});

// Update an Album
app.put("/artists/:id/albums", (req, res) => {
  db.Album.update(
    {
      Album_Name: req.body.name,
      Year: req.body.year,
      Artist_ID: req.params.id,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    db.Album.findByPk(req.params.id).then((result) => {
      res.json(result);
    });
  });
});

// Delete Album
app.delete("/artists/:artist_id/albums/:album_id", (req, res) => {
  db.Album.destroy({
    where: { Artist_ID: req.params.artist_id, id: req.params.album_id },
  }).then(() => {
    db.Album.findAll().then((results) => {
      res.json(results);
    });
  });
});

app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));
