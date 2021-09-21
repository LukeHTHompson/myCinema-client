import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  componentDidMount() {
    axios.get("https://lht-my-cinema.herokuapp.com/movies")
      .then(response => {
        this.setState({
          // data below is not like the variable movieData I've made, instead it is inherent to axios
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view"></div>;

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movieData) => { this.setSelectedMovie(movieData) }} />)}
      </div>
    );
  }
}

export default MainView