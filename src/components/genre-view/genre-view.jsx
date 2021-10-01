import React from "react";
import PropTypes from "prop-types";
import './genre-view.scss';

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export class GenreView extends React.Component {
  render() {
    const { genreData, onBackClick } = this.props;

    return (
      <div className="genre-view">

        <div>
          <span className="label"></span>
          <span className="value genre-name">{genreData.Name}</span>
        </div>

        <div>
          <span className="label"></span>
          <span className="value">{genreData.Description}</span>
        </div>


        <div className="genre-view-back">
          <Button className="genre-view-back" variant="primary" type="button" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>

      </div>
    )
  }
}