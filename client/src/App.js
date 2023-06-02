import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [studio, setStudio] = useState('');
  const [score, setScore] = useState('');
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [editingMovie, setEditingMovie] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/movies')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  const handleMovieNameChange = (e, movieId) => {
    setEditingMovie(prevState => ({
      ...prevState,
      [movieId]: {
        ...prevState[movieId],
        movieName: e.target.value,
      },
    }));
  };

  const handleGenreChange = (e, movieId) => {
    setEditingMovie(prevState => ({
      ...prevState,
      [movieId]: {
        ...prevState[movieId],
        genre: e.target.value,
      },
    }));
  };

  const handleReleaseDateChange = (e, movieId) => {
    setEditingMovie(prevState => ({
      ...prevState,
      [movieId]: {
        ...prevState[movieId],
        releaseDate: e.target.value,
      },
    }));
  };

  const handleStudioChange = (e, movieId) => {
    setEditingMovie(prevState => ({
      ...prevState,
      [movieId]: {
        ...prevState[movieId],
        studio: e.target.value,
      },
    }));
  };

  const handleScoreChange = (e, movieId) => {
    setEditingMovie(prevState => ({
      ...prevState,
      [movieId]: {
        ...prevState[movieId],
        score: e.target.value,
      },
    }));
  };

  const handleAddMovie = () => {
    const newMovie = {
      movieName,
      genre,
      releaseDate,
      studio,
      score,
    };

    fetch('http://localhost:5000/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    })
      .then(response => response.json())
      .then(data => {
        setMovies([...movies, data]);
        setMovieName('');
        setGenre('');
        setReleaseDate('');
        setStudio('');
        setScore('');
      });
  };

  const handleEditMovie = (movie) => {
    setEditingMovieId(movie.id);
    setEditingMovie(prevState => ({
      ...prevState,
      [movie.id]: {
        movieName: movie.movieName,
        genre: movie.genre,
        releaseDate: movie.releaseDate,
        studio: movie.studio,
        score: movie.score,
      }
    }));
  };

  const handleUpdateMovie = (movieId) => {
    const updatedMovie = {
      movieName: editingMovie[movieId].movieName,
      genre: editingMovie[movieId].genre,
      releaseDate: editingMovie[movieId].releaseDate,
      studio: editingMovie[movieId].studio,
      score: editingMovie[movieId].score,
    };

    fetch(`http://localhost:5000/movies/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    })
      .then(response => response.json())
      .then(data => {
        const updatedMovies = movies.map(movie =>
          movie.id === movieId ? data : movie
        );
        setMovies(updatedMovies);
        setEditingMovieId(null);
        setEditingMovie(prevState => ({
          ...prevState,
          [movieId]: {},
        }));
      });
  };

  const handleDeleteMovie = (movieId) => {
    fetch(`http://localhost:5000/movies/${movieId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedMovies = movies.filter(movie => movie.id !== movieId);
        setMovies(updatedMovies);
        setEditingMovie(prevState => {
          const { [movieId]: deletedMovie, ...rest } = prevState;
          return rest;
        });
      });
  };

  return (
    <div>
      <h1>Movie List</h1>
      <input type="text" value={movieName} onChange={e => setMovieName(e.target.value)} required placeholder="Movie Name" />
      <input type="text" value={genre} onChange={e => setGenre(e.target.value)} required placeholder="Genre" />
      <input type="text" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} required placeholder="Release Date" />
      <input type="text" value={studio} onChange={e => setStudio(e.target.value)} required placeholder="Studio" />
      <input type="text" value={score} onChange={e => setScore(e.target.value)} required placeholder="Score" />
      <button className="btn btn-secondary" onClick={handleAddMovie}> + Add Movie</button>
      <table className="movie-table">
        <thead>
          <tr>
            <th scope="col">Movie Name</th>
            <th scope="col">Genre</th>
            <th scope="col">Release Date</th>
            <th scope="col">Studio</th>
            <th scope="col">Score</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <th scope="row">
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={editingMovie[movie.id]?.movieName || ''}
                    onChange={e => handleMovieNameChange(e, movie.id)}
                  />
                ) : (
                  movie.movieName
                )}
              </th>
              <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={editingMovie[movie.id]?.genre || ''}
                    onChange={e => handleGenreChange(e, movie.id)}
                  />
                ) : (
                  movie.genre
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={editingMovie[movie.id]?.releaseDate || ''}
                    onChange={e => handleReleaseDateChange(e, movie.id)}
                  />
                ) : (
                  movie.releaseDate
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={editingMovie[movie.id]?.studio || ''}
                    onChange={e => handleStudioChange(e, movie.id)}
                  />
                ) : (
                  movie.studio
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={editingMovie[movie.id]?.score || ''}
                    onChange={e => handleScoreChange(e, movie.id)}
                  />
                ) : (
                  movie.score
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <button className="btn btn-primary fa fa-edit icon-edit" onClick={() => handleUpdateMovie(movie.id)}>Save</button>
                ) : (
                  <>
                    <button className="btn btn-primary fa fa-edit icon-edit" onClick={() => handleEditMovie(movie)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
