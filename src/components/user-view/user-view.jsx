import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './user-view.scss';

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function UserView(props) {

  const [username, setUsername] = useState(`${localStorage.getItem("user")}`);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayClean, setBirthdayClean] = useState("");
  let token = localStorage.getItem("token");


  useEffect(() => {
    let token = localStorage.getItem("token");
    axios.get(`https://lht-my-cinema.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // assign the results
        setUsername(response.data[0].Username);
        setEmail(response.data[0].Email);
        setBirthday(response.data[0].Birthday);
        console.log(response.data[0].Username + " | ", response.data[0].Email + " | ", response.data[0].Birthday)
        var date = new Date(response.data[0].Birthday)
        setBirthdayClean(date.getUTCMonth() + 1 + "-" + date.getUTCDate() + "-" + date.getUTCFullYear())
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [token])

  function openEditForm() {
    console.log("lol")
  }

  return (
    <div className="user-view">

      <div className="user-view-title">
        <h2>Profile Information</h2> <br />
      </div>
      <div className="user-view-info">
        <span className="user-info-label">Username: </span><span className="user-info-value">{username}</span><span></span> <br />
        <span className="user-info-label">Email: </span><span className="user-info-value">{email}</span><span></span> <br />
        <span className="user-info-label">Birthdate: </span><span className="user-info-value">{birthdayClean}</span><span></span> <br /> <br />
        <span>Favorite Movies:
          <ul className="user-view-movies"></ul> <br />
        </span>
      </div>

      <div className="user-view-actions">
        {/* Edit Info should require a fresh login to ensure that the user wants to make changes */}
        <Link to={`/users/${username}/edit`}>
          <Button className="user-view-edit" variant="warning" type="button" onClick={openEditForm()}>Edit Information</Button>
        </Link> <br />
        <Button className="user-view-delete" variant="danger" type="button">Delete Account</Button> <br /> <br />
      </div>

      <div className="user-view-home">
        {/* Add a button here that will take them back to the full movie list homepage */}
        <Link to={`/`} className="user-home">Home</Link>
      </div>


    </div>
  )
}

UserView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.any
};