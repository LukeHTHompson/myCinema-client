import React from "react";
import PropTypes from "prop-types";
import './director-view.scss';

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export class DirectorView extends React.Component {
  render() {
    const { movieList, directorData, onBackClick } = this.props;

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

        <br />

        <div>
          Films by {directorData.Name + ": "}
          {/* Might be best to have this sorted alphabetically someday */}
          <ul>
            {movieList.map(m => {
              if (m.Director.Name === directorData.Name)
                return (
                  <li key={m._id}>
                    <Link to={`/movies/${m._id}`}>
                      {m.Title}
                    </Link>
                  </li>)
            })}
          </ul>
        </div>

        <div className="director-view-back">
          <Button className="director-view-back" variant="primary" type="button" onClick={() => { onBackClick(null); }}>Back</Button>
          {/* Add a button here that will take them back to the full movie list homepage */}
          <Link to={`/`} className="director-home">Home</Link>
        </div>

      </div>
    )
  }
}