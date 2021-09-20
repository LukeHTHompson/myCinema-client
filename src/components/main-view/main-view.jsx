import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [{ _id: 1, Title: "Inception", Description: "summary 1", ImagePath: "..." }, { _id: 2, Title: "Catch Me If You Can", Description: "summary 2", ImagePath: "..." }, { _id: 3, Title: "Gladiator", Description: "summary 3", ImagePath: "..." }],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movieData) => { this.setSelectedMovie(movieData) }} />)}
      </div>
    );
  }
}

export default MainView