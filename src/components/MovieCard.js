import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieCard.css';

const API_KEY = '4b75175c';

const MovieCard = ({ movie, addToPlaylist, removeFromPlaylist, inPlaylist }) => {
  const [details, setDetails] = useState({
    description: '',
    director: '',
    rating: '',
    genres: [],
    cast: []
  });

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
        if (response.data.Response === 'True') {
          setDetails({
            description: response.data.Plot,
            director: response.data.Director,
            rating: response.data.imdbRating,
            genres: response.data.Genre.split(', '),
            cast: response.data.Actors.split(', ')
          });
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    fetchMovieDetails();
  }, [movie.imdbID]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="movie-card" onMouseEnter={toggleDetails} onMouseLeave={toggleDetails}>
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      {showDetails && (
        <div className="movie-details">
           {inPlaylist ? (
              <button onClick={() => removeFromPlaylist(movie.imdbID)}>Remove from Playlist</button>
            ) : (
              <button onClick={() => addToPlaylist(movie)}>Add to Playlist</button>
            )}
          <div className="movie-info">
            <p>{movie.Title}</p>
            <div className="rating">
              <span>⭐</span>
              <span>{details.rating}/10</span>
            </div>
            <div className="genres">
              {details.genres.map((genre, index) => (
                <span key={index} className="genre">{genre}</span>
              ))}
            </div>
          </div>
          <div className="movie-description">
            <p>{details.description}</p> 
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
