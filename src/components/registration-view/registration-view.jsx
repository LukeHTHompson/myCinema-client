import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './registration-view.scss';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleCreateUser = (e) => {
    // Insert logic here to verify appropriate info was passed to the form, only continue call after this is confirmed, otherwise quit
    e.preventDefault();
    console.log("U: " + username)
    console.log("P: " + password)
    console.log("E: " + email)
    console.log("B: " + birthday)

    const body = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }

    /* send request for new account creation */
    // axios.post("https://lht-my-cinema.herokuapp.com/users", body, {
    //   headers: { "Content-Type": "application/json" }
    // })
    //   .then()
    //   .catch()

    /* send request for auth of new account username/password credentials */
    // props.onLoggedIn(username);

    // Set State so that we don't see register screen again
    props.onRegisterButton(0);
  };

  const handleLogin = (e) => {
    e.preventDefault()
    props.onRegisterButton(0);
  }

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

      <Button className="reg-btn" variant="primary" type="submit" onClick={handleLogin} >
        Login Existing Account
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.any
};