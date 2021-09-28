import React from "react";
import axios from "axios";
import './main-view.scss';

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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