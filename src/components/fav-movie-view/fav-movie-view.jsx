import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./fav-movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";


import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export function FavMovieView(props) {
  const [username, setUsername] = useState(`${localStorage.getItem("user")}`);
  const [favMovies, setFavMovies] = useState([])
  const token = localStorage.getItem("token");

  function addFavMovieVar(movieKey) {
    axios.post(`https://lht-my-cinema.herokuapp.com/users/${localStorage.getItem("user")}/favorites/${movieKey}`,
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
    axios.delete(`https://lht-my-cinema.herokuapp.com/users/${localStorage.getItem("user")}/favorites/${movieKey}`,
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
    axios.get(`https://lht-my-cinema.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (favMovies.length !== response.data[0].FavoriteMovies.length) {
          setFavMovies(response.data[0].FavoriteMovies)
        }
      })
      .catch(function (error) {
        console.log("ERROR");
      })
  }, [favMovies])

  // Return placeholder "None" when the user has no currently selected favorite movies
  if (favMovies.length == 0) {
    return <h5 className="no-favs">None</h5>
  }

  // When a user does have favorited movies cycle through the full list of movies and only display a movie card for those included on their favMovies list
  if (favMovies) {
    return props.movieList.map(m => ((
      favMovies.includes(m._id)) && <Col md={4} key={m._id} className="fav-movie-card">
        <MovieCard movieData={m} key={m._id} movieKey={m._id} source="user-view-fav-movie" addFavMovie={addFavMovieVar} removeFavMovie={removeFavMovieVar} />
      </Col>
    ))
  }
}