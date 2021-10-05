import React from "react";
import PropTypes from "prop-types";
import './user-view.scss';

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function UserView(props) {

  // const handleDeleteUser = (e) => {
  //   axios.delete("https://lht-my-cinema.herokuapp.com/users/" + { user.Name },)
  // }

  const onBackClick = () => {
    history.goBack();
  }

  return (
    <div className="user-view">


      <div>
        Profile Information:
      </div>

      <div>
        <Button className="user-view-delete" variant="danger" type="button">Delete Account</Button>
      </div>

      <div className="user-view-back">
        {/* Unable to use Back button when constructing this as a Function View? */}
        <Button className="user-view-back" variant="primary" type="button" onClick={() => { onBackClick(null); }}>Back</Button>
        {/* Add a button here that will take them back to the full movie list homepage */}
        <Link to={`/`} className="user-home">Home</Link>
      </div>


    </div>
  )
}