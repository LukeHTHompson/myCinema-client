import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './login-view.scss';

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("U: " + username, "P: " + password);
    /* send request for auth */
    axios.post("https://lht-my-cinema.herokuapp.com/login", {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log("No Matching User")
      })
  };

  return (
    <Form>
      <Form.Group control_id="formUsername">

        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button className="lgn-btn" variant="primary" type="submit" onClick={handleSubmit} >
        Submit
      </Button>

      <Link to={`/register`}>
        <Button className="lgn-btn" variant="primary">Register</Button>
      </Link>

      {/* <Button className="lgn-btn" variant="primary" type="submit" onClick={handleRegister} >
        Register now (FAKE)
      </Button> */}
    </Form>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};