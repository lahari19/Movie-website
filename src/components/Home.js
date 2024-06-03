import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import MovieCard from './MovieCard';

const API_KEY = '4b75175c';

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [playlist, setPlaylist] = useState([]);

  // Fetch default movies when the component mounts
  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`);
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
          setError('');
        } else {
          setError(response.data.Error);
          setMovies([]);
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      }
    };

    fetchDefaultMovies();

    // Load playlist from localStorage when component mounts
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);
  }, []);

  // Save playlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError('');
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const addToPlaylist = (movie) => {
    setPlaylist((prevPlaylist) => {
      if (prevPlaylist.find((m) => m.imdbID === movie.imdbID)) {
        return prevPlaylist; // Movie already in playlist
      }
      return [...prevPlaylist, movie];
    });
  };

  const removeFromPlaylist = (movieId) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((movie) => movie.imdbID !== movieId));
  };

  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Movie Library</h1>
        <Link to="/" className="logout-link">Logout</Link>
      </header>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error">{error}</div>}

      <div className="movie-results">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} addToPlaylist={addToPlaylist} />
        ))}
      </div>

      <div className="playlist">
        <h2 className="playlist-title">My Playlist</h2>
        {playlist.length === 0 && <p>No movies in playlist.</p>}
        {playlist.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} removeFromPlaylist={removeFromPlaylist} inPlaylist />
        ))}
      </div>
    </div>
  );
};

export default Home;
