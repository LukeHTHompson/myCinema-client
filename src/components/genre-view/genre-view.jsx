import React from "react";
import PropTypes from "prop-types";
import './genre-view.scss';

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


export class GenreView extends React.Component {
  render() {
    const { movieList, genreData, onBackClick } = this.props;

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

        <br />

        <div>
          Other {genreData.Name} Films:
          {/* Might be best to have this sorted alphabetically someday */}
          <ul>
            {movieList.map(m => {
              if (m.Genre.Name === genreData.Name)
                return (
                  <li key={m._id}>
                    <Link to={`/movies/${m._id}`}>
                      {m.Title}
                    </Link>
                  </li>)
            })}
          </ul>
        </div>

        <div>
          <Button className="genre-view-back" variant="primary" type="button" onClick={() => { onBackClick(null); }}>Back</Button>
          {/* Add a button here that will take them back to the full movie list homepage */}
          <Link to={`/`} className="genre-home">Home</Link>
        </div>


      </div>
    )
  }
}