import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MovieList = ({ movies }) => (
  <div>
    {movies.map(movie => (
      <div className='movie' key={movie.id}>
        <Link to={`/movie/${movie.id}`}>{movie.name}</Link>
      </div>
    ))}
  </div>
);

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

const Movies = connect(mapStateToProps)(MovieList);

export default Movies;
