import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './fav-movie-view.scss';
import { MovieCard } from "../movie-card/movie-card";


import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export function FavMovieView(props) {
  const [username, setUsername] = useState(`${localStorage.getItem("user")}`);
  const [favMovies, setFavMovies] = useState([])
  const token = localStorage.getItem("token");

  useEffect(() => {
    // let token = localStorage.getItem("token");
    axios.get(`https://lht-my-cinema.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response);
        // assign the results
        setFavMovies(response.data[0].FavoriteMovies);
        console.log(response.data[0].FavoriteMovies);
        console.log(favMovies);
        console.log(props.movieList);
      })
      .catch(function (error) {
        console.log("ERROR");
      })
  }, [token])

  return <div>MOVIES HERE</div>
}