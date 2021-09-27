import React from "react";
import PropTypes from "prop-types";
import './movie-card.scss';

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick, id } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description} <br /> key: {id}</Card.Text>
          <Button onClick={() => onMovieClick(movieData)} variant="link">More Info</Button>
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
  onMovieClick: PropTypes.func.isRequired
};