// Main Imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// React Standard Components
import Col from "react-bootstrap/Col";

// Views
import { MovieCard } from "../movie-card/movie-card";

// Store connection
import { connect } from "react-redux";

// Styling
import "./fav-movie-view.scss";

export function FavMovieView(props) {

  let { user, token, movies } = props;

  const [username, setUsername] = useState(`${user}`);
  const [favMovies, setFavMovies] = useState([])

  function addFavMovieVar(movieKey) {
    axios.post(`https://lht-my-cinema.herokuapp.com/users/${user}/favorites/${movieKey}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
      .then(response => {
        console.log(response.data.FavoriteMovies);
        if (favMovies.length !== response.data.FavoriteMovies.length) {
          setFavMovies(prev => {
            return [...prev, movieKey];
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  function removeFavMovieVar(movieKey) {
    axios.delete(`https://lht-my-cinema.herokuapp.com/users/${user}/favorites/${movieKey}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
      .then(response => {
        console.log(response.data.FavoriteMovies);
        if (favMovies.length !== response.data.FavoriteMovies.length) {
          setFavMovies(response.data.FavoriteMovies.filter(prev => prev == !movieKey))
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    axios.get(`https://lht-my-cinema.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (favMovies.length !== response.data[0].FavoriteMovies.length) {
          setFavMovies(response.data[0].FavoriteMovies)
        }
      })
      .catch(function (error) {
        console.log("ERROR: " + error);
      })
  }, [favMovies])

  // Return placeholder "None" when the user has no currently selected favorite movies
  if (favMovies.length == 0) {
    return <h5 className="no-favs">None</h5>
  }

  // When a user does have favorited movies cycle through the full list of movies and only display a movie card for those included on their favMovies list
  if (favMovies) {
    return props.movies.map(m => ((
      favMovies.includes(m._id)) && <Col md={4} key={m._id} className="fav-movie-card">
        <MovieCard movieData={m} key={m._id} movieKey={m._id} source="user-view-fav-movie" addFavMovie={addFavMovieVar} removeFavMovie={removeFavMovieVar} />
      </Col>
    ))
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    movies: state.movies
  }
}

export default connect(mapStateToProps)(FavMovieView);