import React, { useState } from "react";
import PropTypes from "prop-types";
import './registration-view.scss';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleCreateUser = () => {
    event.preventDefault();
    console.log("U: " + username)
    console.log("P: " + password)
    console.log("E: " + email)
    console.log("B: " + birthday)
    /* send request for new account creation */
    /* send request for auth of new account username/password credentials */
    props.onRegisterButton(0);
    props.onLoggedIn(username);
  };

  const handleLogin = () => {
    props.onRegisterButton(0);
  }

  return (
    <Form>
      <Form.Group controlID="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlID="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlID="formUsername">
        <Form.Label>E-Mail:</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlID="formUsername">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleCreateUser} >
        Create Account
      </Button>

      <Button variant="primary" type="submit" onClick={handleLogin} >
        Login Existing Account
      </Button>
    </Form>
    // <form>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    //   </label>
    //   <label>
    //     Email:
    //     <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
    //   </label>
    //   <label>
    //     Birthday:
    //     <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
    //   </label>
    //   <button type="submit" onClick={handleCreateUser}>
    //     Submit
    //   </button>
    // </form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string,
  birthday: PropTypes.any
};