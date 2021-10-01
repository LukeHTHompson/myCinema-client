import React from "react";
import axios from "axios";
import './main-view.scss';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null,
      register: null
    };
  }

  getMovies(token) {
    axios.get("https://lht-my-cinema.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // assign the result of the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      register: 0
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  // Convert this to the new method via a <Link> element in the login view
  onRegisterButton(register) {
    this.setState({
      register
    });
  }

  render() {
    const { register, user, movies, selectedMovie } = this.state;
    // No need to check for register state as the new method will navigate from a Link in login view
    if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegisterButton={register => this.onRegisterButton(register)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterButton={register => this.onRegisterButton(register)} />;

    // if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <Router>
        <Row className="logout-row justify-content-md-right">
          <Col md={9}>
            <p className="main-header">Welcome to myCinema</p>
          </Col>
          <Col className="logout-col" md={3}>
            <p>User: {user}</p>
            <Button className="logout" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Col>
        </Row>
        <Row className="main-view justify-content-md-center">

          {/* Registration View */}
          <Route exact path="/register" render={({ history }) => {
            return <RegistrationView onBackClick={() => history.goBack()} />
          }} />

          {/* Main View */}
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movieData={m} key={m._id} />
              </Col>
            ))
          }} />

          {/* Movie View */}
          <Route path="/movies/:movie_id" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movieData={movies.find(m => m._id === match.params.movie_id)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Director View */}
          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView directorData={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Genre View */}
          <Route path="/genres/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>

        {/* <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map((movie) => (
              <Col md={3} key={movie._id}>
                <MovieCard key={movie._id} id={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            ))
          }
        </Row> */}
      </Router>
    );
  }
}

export default MainView