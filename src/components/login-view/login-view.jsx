import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./login-view.scss";

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  function showErrorMessage(input, message) {
    let container = input.parentElement;

    // Remove any existing errors
    let error = container.querySelector(".error-message");
    if (error) {
      container.removeChild(error);
    }
    // Add in our current error, if any
    if (message) {
      let error = document.createElement("div");
      error.classList.add("error-message");
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function checkUsername(username) {
    setUsername(username);
    let value = username;
    let regex = new RegExp("^[a-z0-9]+$", "i")
    const usernameInput = document.querySelector("#formUsername")

    if (!value) {
      showErrorMessage(usernameInput, "Username is a required field.")
      setValidUsername(false);
      return false;
    }
    if (!regex.test(username)) {
      showErrorMessage(usernameInput, "Username may only contain letters and numbers.")
      setValidUsername(false);
      return false;
    }
    if (value.length < 5) {
      showErrorMessage(usernameInput, "Username must be at least 5 characters.")
      setValidUsername(false);
      return false;
    }
    showErrorMessage(usernameInput,)
    setValidUsername(true);
    return true;
  }

  function checkPassword(password) {
    setPassword(password);
    let value = password;
    const passwordInput = document.querySelector("#formPassword")

    if (!value) {
      showErrorMessage(passwordInput, "Password is a required field.")
      setValidPassword(false);
      return false
    }

    showErrorMessage(passwordInput,)
    setValidPassword(true);
    return true;
  }

  const handleSubmit = (e) => {
    // Prevents race condition with page reloading on default submit behavior
    e.preventDefault();

    // Send request for authorization
    axios.post("https://lht-my-cinema.herokuapp.com/login", {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log(e.message)
        console.log("Error Logging In")
        const form = document.querySelector("#loginForm")
        showErrorMessage(form, "Incorrect Username and/or Password")
      })
  };

  return (
    <Form id="loginForm">
      <Form.Group control_id="formUsername">

        <Form.Label>Username:</Form.Label>
        <Form.Control id="formUsername" type="text" value={username} onChange={e => checkUsername(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control id="formPassword" type="password" value={password} onChange={e => checkPassword(e.target.value)} />
      </Form.Group>

      <Button disabled={!(validUsername && validPassword)} className="lgn-btn" variant="primary" type="submit" onClick={handleSubmit} >
        Submit
      </Button>

      <Link to={`/register`}>
        <Button className="lgn-btn" variant="primary">Register</Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};