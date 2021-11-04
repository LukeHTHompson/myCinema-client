import React from "react";
import axios from "axios";
import { connect } from "react-redux";

// #0
import { setUser, setMovies } from "../../actions/actions";

// we haven"t written this one yet
import MoviesList from "../movies-list/movies-list";

import "./main-view.scss";

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
// import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { UserView } from "../user-view/user-view";
import { UserViewEdit } from "../user-view-edit/user-view-edit";
import { FavMovieView } from "../fav-movie-view/fav-movie-view";
import title from "url:../../../img/MyCinema.svg";
import logo from "url:../../../img/MyCinemaLogo.svg";



import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

class MainView extends React.Component {

  constructor() {
    super();
    // this.state = {
    //   user: null,
    // };
  }

  // Replace User
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      // this.props.setUser(this.props.user);
      this.getMovies(accessToken);
    }
  }


  getMovies(token) {
    axios.get("https://lht-my-cinema.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addFavMovie(user, movieKey) {
    axios.post(`https://lht-my-cinema.herokuapp.com/users/${user}/favorites/${movieKey}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
      .then(response => {
        console.log(response.data.FavoriteMovies);
        return response.data.FavoriteMovies;
      })
      .catch(error => {
        console.log(error);
      })
  }

  removeFavMovie(user, movieKey) {
    axios.delete(`https://lht-my-cinema.herokuapp.com/users/${user}}/favorites/${movieKey}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
      .then(response => {
        console.log(response.data.FavoriteMovies);
        return response.data.FavoriteMovies;
      })
      .catch(error => {
        console.log(error);
      })
  }

  onLoggedIn(authData) {
    // Remove for final
    console.log(authData);
    this.props.setUser(authData.user.Username);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser("");
    window.open("/", "_self")
  }

  render() {
    let { user, movies } = this.props;
    // if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegister={data => this.onRegister(data)} />;

    // if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <Router>
        <Row className="logout-row justify-content-md-right">
          <Col md={8}>
            <img className="main-header" src={title} width="740px" alt="MyCinema"></img>
          </Col>
          <Col md={2}>
            <img className="main-logo" src={logo} width="265px" alt="MyCinema Logo"></img>
          </Col>
          {/* Conditional Rendering here to prevent user and logout buttons from appearing if no user is currently signed in. */}
          {user && <Col className="logout-col" md={2}>
            <Link to={`/users/${user}`}>User: {user}</Link>
            <br />
            <Button className="logout" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Col>}
        </Row>

        {/* Body Content of the views */}
        <Row className="main-view justify-content-md-center">


          {/* Login/Main View */}
          <Route exact path="/" render={() => {
            if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
            if (movies.length === 0) return <div className="main-view"></div>

            return <MoviesList movies={movies} user={user} addFavMovie={movie => this.addFavMovie(movie)} removeFavMovie={movie => this.removeFavMovie(movie)} />;

            // return movies.map(m => (
            //   <Col className="movie-card-col" md={3} key={m._id}>
            //     <MovieCard movieData={m} key={m._id} movieKey={m._id} source="main" addFavMovie={movie => this.addFavMovie(movie)} removeFavMovie={movie => this.removeFavMovie(movie)} />
            //   </Col>
            // ))
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

            return (
              <React.Fragment>
                <div className="user-view-col">
                  <Col md={12}>
                    {/* We currently lose the props.movieList values on refresh of page */}
                    <UserView movieList={movies} user={user} />
                  </Col>

                  <Row className="user-view-fav-movie-row">
                    <FavMovieView movieList={movies} source="user-view-fav-movie" getMovies={token => this.getMovies(token)} addFavMovie={movie => this.addFavMovie(movie)} removeFavMovie={movie => this.removeFavMovie(movie)} />
                  </Row>
                </div>
              </React.Fragment>
            )
          }} />

          {/* User View Edit */}
          <Route path="/users/:user/edit" render={({ match, history }) => {
            if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            return <Col md={8}>
              <UserViewEdit movieList={movies} onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />

        </Row>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setUser, setMovies })(MainView);
