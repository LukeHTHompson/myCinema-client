import React, { useState } from "react";
import PropTypes from "prop-types";
import './login-view.scss';

// Imports for Store connection and state manipulation
import { connect } from "react-redux";
import { setUser, setToken, setMovies } from "../../actions/actions";

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // let { user, token, movies } = this.props;

  function onLoggedIn(authData) {
    // Remove for final
    console.log(authData);
    setUser(authData.user.Username);
    // this.props.setUser("tester")
    setToken(authData.token);
    console.log(authData.user.Username)
    console.log(authData.token)
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    // this.getMovies(this.props.token);
  }

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
    // REMOVE AFTER TESTING
    setUser(username);

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
    e.preventDefault();
    // Remove for final
    console.log("U: " + username, "P: " + password);
    /* send request for auth */
    axios.post("https://lht-my-cinema.herokuapp.com/login", {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        // Remove for final
        console.log(data);

        onLoggedIn(data);
      })
      .catch(e => {
        console.log(e.message)
        console.log("Error Logging In")
        const form = document.querySelector("#loginForm")
        showErrorMessage(form, "Incorrect Username and/or Password")
      })
  };

  return (

    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit} >
        Submit
      </Button>

      <Button variant="primary" type="submit" onClick={handleRegister} >
        Register
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};

let mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token
  }
}

connect(mapStateToProps, { setUser, setToken })(LoginView);
