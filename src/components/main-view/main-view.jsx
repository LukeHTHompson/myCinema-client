import React from "react";
import axios from "axios";
import './main-view.scss';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { UserView } from "../user-view/user-view";
import { UserViewEdit } from "../user-view-edit/user-view-edit";
import { FavMovieView } from "../fav-movie-view/fav-movie-view";



import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
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

  addFavMovie(movieKey) {
    axios.post(`https://lht-my-cinema.herokuapp.com/users/${localStorage.getItem("user")}/favorites/${movieKey}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
      .then(response => {
        console.log(response.data.FavoriteMovies);
      })
      .catch(error => {
        console.log(error);
      })
  }

  removeFavMovie(movieKey) {
    axios.delete(`https://lht-my-cinema.herokuapp.com/users/${localStorage.getItem("user")}/favorites/${movieKey}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
      .then(response => {
        console.log(response.data.FavoriteMovies);
      })
      .catch(error => {
        console.log(error);
      })
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
    window.open("/", "_self")

  }

  render() {
    const { register, user, movies } = this.state;
    if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegister={data => this.onRegister(data)} />;

    // if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <Router>
        {/* Need a way to hide the User: link and the Logout button in the screens where a user would not be logged in yet. */}
        <Row className="logout-row justify-content-md-right">
          <Col md={9}>
            <p className="main-header">Welcome to myCinema</p>
          </Col>
          <Col className="logout-col" md={3}>
            <Link to={`/users/${user}`}>User: {user}</Link>
            <br />
            <Button className="logout" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Col>
        </Row>

        {/* Body Content of the views */}
        <Row className="main-view justify-content-md-center">


          {/* Login/Main View */}
          <Route exact path="/" render={() => {
            if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
            if (movies.length === 0) return <div className="main-view"></div>

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movieData={m} key={m._id} movieKey={m._id} addFavMovie={movie => this.addFavMovie(movie)} removeFavMovie={movie => this.removeFavMovie(movie)} />
              </Col>
            ))
          }} />


          {/* Registration View */}
          <Route path="/register" render={({ history }) => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />


          {/* Movie View */}
          <Route path="/movies/:movie_id" render={({ match, history }) => {
            if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            return <Col md={8}>
              <MovieView movieData={movies.find(m => m._id === match.params.movie_id)} onBackClick={() => history.goBack()} />
            </Col>
          }} />


          {/* Director View */}
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView movieList={movies} directorData={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />


          {/* Genre View */}
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView movieList={movies} genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* User View */}
          <Route exact path="/users/:user" render={({ match, history }) => {
            if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            return <Col md={8} className="user-view-col">
              {/* We currently lose the props.movieList values on refresh of page */}
              <UserView movieList={movies} />
              Component showing all favorite movies and ability to unfavorite them + free text search for films to add
              <FavMovieView movieList={movies} />
              <div>
                <Link to={`/`} className="user-home">Home</Link>
              </div>
            </Col>
          }} />

          {/* User View Edit */}
          <Route path="/users/:user/edit" render={({ match, history }) => {
            if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            return <Col md={8}>
              <UserViewEdit movieList={movies} onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

export default MainView