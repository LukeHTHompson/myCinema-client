import React from "react";
import axios from "axios";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegisterButton(register) {
    this.setState({
      register
    });
  }

  render() {
    const { register, user, movies, selectedMovie } = this.state;

    if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegisterButton={register => this.onRegisterButton(register)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterButton={register => this.onRegisterButton(register)} />;

    if (movies.length === 0) return <div className="main-view"></div>;

    if (selectedMovie) return <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movieData) => { this.setSelectedMovie(movieData) }} />)}
      </div>
    );
  }
}

export default MainView