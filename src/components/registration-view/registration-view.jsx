import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './registration-view.scss';

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");


  const handleCreateUser = (e) => {
    // Must prevent the form submission because this will reload the page, causing a race condition with our asynchronous functions
    e.preventDefault();

    /* send request for new account creation */
    axios.post("https://lht-my-cinema.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const regData = response.data;
        console.log("Reg");
        console.log(regData);
        /* send request for auth of new account username/password credentials */
        axios.post("https://lht-my-cinema.herokuapp.com/login", {
          Username: username,
          Password: password
        })
          .then(response => {
            const loginData = response.data;
            console.log(loginData);
            props.onLoggedIn(loginData);
            window.open("/", "_self")
          })
          .catch(e => {
            console.log("No Matching User");
            console.log(e);
            window.open("/", "_self")
          })
      })
      .catch(e => {
        console.log("Error Registering");
        console.log(e);
        window.open("/", "_self")
      });
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

      <Form.Group control_id="formUsername">
        <Form.Label>E-Mail:</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="formUsername">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button className="reg-btn" variant="primary" type="submit" onClick={handleCreateUser} >
        Create Account
      </Button>

      <Link to={`/`}>
        <Button className="lgn-btn" variant="link">Back</Button>
      </Link>
    </Form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.any
};