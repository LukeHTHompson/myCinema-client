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
