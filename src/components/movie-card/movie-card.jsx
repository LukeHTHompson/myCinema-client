import React from "react";
import PropTypes from "prop-types";
import './movie-card.scss';

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;

    return (
      <Card border="dark">
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