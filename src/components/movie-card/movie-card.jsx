import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

// Fav/Unfav button handling to be implemented here

export class MovieCard extends React.Component {
  render() {
    const { movieData, addFavMovie, removeFavMovie, movieKey, source } = this.props;

    return (
      <Card border="dark" className={source}>
        {/* &#10025; */}
        {/* ^Star */}
        {/* {movieData._id} is in user.FavoriteMovies array */}
        <span className="fav-movie">
          <Button className="fav-movie" variant="outline-success" onClick={() => { addFavMovie(movieKey); }}>Favorite</Button>
        </span>
        <span className="unfav-movie">
          <Button className="unfav-movie" variant="outline-danger" onClick={() => { removeFavMovie(movieData._id) }}>Unfavorite</Button>
        </span>
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title} ({movieData.Genre.Name})</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Link to={`/movies/${movieData._id}`}>
            <Button className="more-info" variant="link">More Info</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string
  }).isRequired,
};