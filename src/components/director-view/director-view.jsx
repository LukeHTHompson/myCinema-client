import React from "react";
import PropTypes from "prop-types";
import './director-view.scss';

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export class DirectorView extends React.Component {
  render() {
    const { directorData, onBackClick } = this.props;

    return (
      <div className="director-view">

        <div>
          <span className="label"></span>
          <span className="value director-name">{directorData.Name}</span>
        </div>

        <div>
          <span className="label"></span>
          <span className="value">{directorData.Bio}</span>
        </div>

        <br />

        <div>
          <span className="label">Birth: </span>
          <span className="value">{directorData.Birth}</span>
        </div>

        <div>
          <span className="label">Death: </span>
          <span className="value">{directorData.Death}</span>
        </div>


        <div className="director-view-back">
          <Button className="director-view-back" variant="primary" type="button" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>

      </div>
    )
  }
}