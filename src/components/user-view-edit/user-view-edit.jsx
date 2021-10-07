import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './user-view-edit.scss';

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import axios from "axios";

export function UserViewEdit(props) {
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
        var date = new Date(response.data[0].Birthday)
        setBirthdayClean(date.getUTCMonth() + 1 + "-" + date.getUTCDate() + "-" + date.getUTCFullYear())
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [token])

  const usernameStart = localStorage.getItem("user");

  const handleEditUser = (e) => {
    // Must prevent the form submission because this will reload the page, causing a race condition with our asynchronous functions
    e.preventDefault();
    // const usernameStart = localStorage.getItem("user");

    // Convert birthdayClean to the format of birthday in DB: YYYY-MM-DDT00:00:00.000Z
    var cleanDate = new Date(birthdayClean)
    let birthday = cleanDate.getUTCFullYear() + "-" + cleanDate.getUTCMonth() + "-" + cleanDate.getUTCDate() + "T00:00:00.000Z"

    /* send request for new account creation */
    axios.put(`https://lht-my-cinema.herokuapp.com/users/${usernameStart}`, {
      data:
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthdayClean
      },
      headers:
        { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response.data);
        console.log("U: " + { username } + "P: " + { password } + "E: " + { email } + "B: " + { birthday })
        /* send request for auth of new account username/password credentials */
        axios.post("https://lht-my-cinema.herokuapp.com/login", {
          Username: username,
          Password: password
        })
          .then(response => {
            const loginData = response.data;
            console.log(loginData);
            props.onLoggedIn(loginData);
            window.open(`/`, "_self")
          })
          .catch(e => {
            console.log("No Matching User");
            console.log(e);
          })
      })
      .catch(e => {
        console.log("Error Editing Info");
        console.log(e);
        // window.open("/", "_self")
      });
  };

  return (
    <Form>
      <Form.Group control_id="form-username">
        <Form.Label>New Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="form-password">
        <Form.Label>Confirm Current Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="form-email">
        <Form.Label>New E-Mail:</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="form-date">
        <Form.Label>New Birthday:</Form.Label>
        <Form.Control type="text" value={birthdayClean} onChange={e => setBirthdayClean(e.target.value)} />
        {/* <DatePicker select={birthday} onChange={(date) => setBirthday(date)} /> */}
      </Form.Group>

      <Button className="reg-btn" variant="primary" type="submit" onClick={handleEditUser}>
        Submit Changes
      </Button>

      <Link to={`/users/${usernameStart}`}>
        <Button className="lgn-btn" variant="link">Back</Button>
      </Link>
    </Form>
  )
}