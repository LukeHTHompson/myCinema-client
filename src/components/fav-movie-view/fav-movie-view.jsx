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
    axios.get(`https://lht-my-cinema.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log("response")
        console.log(response);
        // assign the results
        console.log("favorite movies in response")
        console.log(response.data[0].FavoriteMovies);
        setFavMovies(response.data[0].FavoriteMovies);
        console.log(favMovies);
        // let favMovies = response.data[0].FavoriteMovies.map((favoriteId) => {
        //   return movies.find((movie) => movie._id === favoriteId);
        // })
        console.log("full movie list from props")
        console.log(props.movieList);
        setFavMovies(response.data[0].FavoriteMovies.map((favoriteId) => {
          return movies.find((movie) => movie._id === favoriteId);
        }));
      })
      .catch(function (error) {
        console.log("ERROR");
      })
  }, [favMovies])

  return props.movieList.map(m => (
    (favMovies.includes(m._id)) && <Col md={4} key={m._id} className="fav-movie-card">
      <MovieCard movieData={m} key={m._id} movieKey={m._id} addFavMovie={props.addFavMovie} removeFavMovie={props.removeFavMovie} />
    </Col>
  ));
}