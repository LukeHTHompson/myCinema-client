import React from "react";
import axios from "axios";
import './main-view.scss';

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

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
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
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
    // Set selectedMovie = null here if we want a user to log in to the home screen as opposed to the last movie they were viewing.
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

  onRegisterButton(register) {
    this.setState({
      register
    });
  }

  render() {
    const { register, user, movies, selectedMovie } = this.state;

    if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegisterButton={register => this.onRegisterButton(register)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterButton={register => this.onRegisterButton(register)} />;

    // if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <React.Fragment>
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
        </Row>
      </React.Fragment>
    );
  }
}

export default MainView