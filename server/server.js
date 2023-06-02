const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Set the desired port number

app.use(cors());
app.use(express.json());

let movies = [];

// GET route to fetch the list of movies
app.get('/movies', (req, res) => {
  res.json(movies);
});


// POST route to add a new movie
app.post('/movies', (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// PUT route to update a movie
app.put('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const updatedMovie = req.body;
  movies = movies.map((movie) => {
    if (movie.id === movieId) {
      return { ...movie, ...updatedMovie };
    }
    return movie;
  });
  res.json(updatedMovie);
});

// DELETE route to remove a movie
app.delete('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  movies = movies.filter((movie) => movie.id !== movieId);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
