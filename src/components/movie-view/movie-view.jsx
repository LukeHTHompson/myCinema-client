import React from "react";
import PropTypes from "prop-types";
import './movie-view.scss';

import Button from "react-bootstrap/Button";
export class MovieView extends React.Component {

  // keypressCallback(event) {
  //   console.log(event.key);
  // }

  // componentDidMount() {
  //   document.addEventListener("keypress", this.keypressCallback);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("keypress", this.keypressCallback);
  // }

  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <div className="movie-view">

        {/* <div className="movie-poster">
          <img className="movie-view-poster" src={movieData.ImagePath} />
        </div> */}

        <div className="movie-title movie-view-info-top">
          <span className="label"></span>
          <span className="value">{movieData.Title}</span>
        </div>

        <div className="movie-director movie-view-info-top">
          <span className="label">Director: </span>
          <span className="value">{movieData.Director.Name}</span>
        </div>

        <div className="movie-genre movie-view-info-top">
          <span className="label">Genre: </span>
          <span className="value">{movieData.Genre.Name}</span>
        </div>

        <div className="movie-poster">
          <img className="movie-view-poster" src={movieData.ImagePath} />
        </div>

        <br />
        <div className="movie-description movie-view-info-bottom">
          <span className="label"></span>
          <span className="value">{movieData.Description}</span>
        </div>

        <div className="movie-view-back  movie-view-info-bottom">
          <Button className="movie-view-back" variant="primary" type="button" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </div >
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Imagepath: PropTypes.string
  }).isRequired
};