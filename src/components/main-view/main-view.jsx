// Remove setUserInfo and related pieces.

// Main imports
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

// React Standard Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

// Views
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { UserView } from "../user-view/user-view";
import { UserViewEdit } from "../user-view-edit/user-view-edit";
import { FavMovieView } from "../fav-movie-view/fav-movie-view";
import MoviesList from "../movies-list/movies-list";

// Store connection
import { connect } from "react-redux";
import { setUser, setUserInfo, setToken, setMovies } from "../../actions/actions";

// Styling
import "./main-view.scss";
import title from "url:../../../img/MyCinema.svg";
import logo from "url:../../../img/MyCinemaLogo.svg";

class MainView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
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

  addFavMovie(movieKey) {
    axios.post(`https://lht-my-cinema.herokuapp.com/users/${this.props.user}/favorites/${movieKey}`,
      {},
      { headers: { Authorization: `Bearer ${this.props.token}` } }
    )
      .then(response => {
        console.log(response.data.FavoriteMovies);
        return response.data.FavoriteMovies;
      })
      .catch(error => {
        console.log(error);
      })
  }

  removeFavMovie(movieKey) {
    axios.delete(`https://lht-my-cinema.herokuapp.com/users/${this.props.user}/favorites/${movieKey}`,
      { headers: { Authorization: `Bearer ${this.props.token}` } }
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
    this.setState({ user: authData.user });
    // console.log(user)
    this.props.setUser({ user: this.state.user });
    // this.props.setUserInfo(authData.user);
    this.props.setToken(authData.token);
    localStorage.setItem("token", authData.token);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    this.props.setUser("");
    this.props.setToken("");
    window.open("/", "_self")
  }

  render() {
    let { user, token, movies } = this.props;

    return (
      <Router>
        <Row className="logout-row justify-content-md-right">
          <Col md={8}>
            <img className="main-header" src={title} width="740px" alt="MyCinema"></img>
          </Col>
          {token && <Col md={2}>
            <img className="main-logo" src={logo} width="265px" alt="MyCinema Logo"></img>
          </Col>}

          {token && <Col className="logout-col" md={2}>
            <Link to={`/users/${user}`}>User: {user.Username}</Link>
            <br />
            <Button className="logout" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Col>}
        </Row>

        {/* Body Content of the views */}
        <Row className="main-view justify-content-md-center">


          {/* Login/Main View */}
          <Route exact path="/" render={() => {
            if (!token) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
            if (movies.length === 0) return <div className="main-view"></div>

            return <MoviesList movies={movies} user={user} addFavMovie={movie => this.addFavMovie(movie)} removeFavMovie={movie => this.removeFavMovie(movie)} />;
          }} />


          {/* Registration View */}
          <Route path="/register" render={({ history }) => {
            if (token) return <Redirect to="/" />
            return <Col>
              <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />


          {/* Movie View */}
          <Route path="/movies/:movie_id" render={({ match, history }) => {
            if (!token) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            return <Col md={8}>
              <MovieView movieData={movies.find(m => m._id === match.params.movie_id)} onBackClick={() => history.goBack()} />
            </Col>
          }} />


          {/* Director View */}
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!token) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView movieList={movies} directorData={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />


          {/* Genre View */}
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!token) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView movieList={movies} genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* User View */}
          <Route exact path="/users/:user" render={({ match, history }) => {
            if (!token) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

            return (
              <React.Fragment>
                <div className="user-view-col">
                  <Col md={12}>
                    <UserView
                    // user={user} token={token}
                    />
                  </Col>

                  <Row className="user-view-fav-movie-row">
                    <FavMovieView
                      movies={movies} user={user} token={token}
                      source="user-view-fav-movie" getMovies={token => this.getMovies(token)} addFavMovie={movie => this.addFavMovie(movie)} removeFavMovie={movie => this.removeFavMovie(movie)} />
                  </Row>
                </div>
              </React.Fragment>
            )
          }} />

          {/* User View Edit */}
          <Route path="/users/:user/edit" render={({ match, history }) => {
            if (!token) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

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
    // userInfo: state.user,
    token: state.token,
    movies: state.movies
  }
}

export default connect(mapStateToProps, {
  setUser,
  // setUserInfo,
  setToken, setMovies
})(MainView);