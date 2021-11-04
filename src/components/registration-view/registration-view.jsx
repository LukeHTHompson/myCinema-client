// Could import the following to allow for validation that a registering username is not already taken:
// const Models = require("./models.js"); // Need to adjust the filepath here
// const Users = Models.User;

// Place this into checkUsername(username):

// Users.findOne({ Username: username }).exec()
//   .then((name) => {
//     if (name) {
//       showErrorMessage(usernameInput, "'{username}' is already taken.")
//       return false;
//     }
//    .catch((error) => {console.log(error)})
//   }

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
  const [validUsername, setValidUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validEmail, setValidEmail] = useState(false)

  // All validations only begin after the second character has been input, and do not function at all
  // for single character inputs. This relates somehow to our const inputs above and the parentElement below.
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

  function checkEmail(email) {
    setEmail(email);
    let value = email;
    const emailInput = document.querySelector("#formEmail")

    if (!value) {
      showErrorMessage(emailInput, "E-mail is a required field.")
      setValidEmail(false);
      return false;
    }
    if (value.indexOf("@") === -1) {
      showErrorMessage(emailInput, "You must enter a valid e-mail address.")
      setValidEmail(false);
      return false;
    }

    showErrorMessage(emailInput,)
    setValidEmail(true);
    return true;
  }

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
    <Form id="registerForm">
      <Form.Group control_id="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control id="formUsername" type="text" value={username} onChange={e => checkUsername(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control id="formPassword" type="password" value={password} onChange={e => checkPassword(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="formEmail">
        <Form.Label>E-Mail:</Form.Label>
        <Form.Control id="formEmail" placeholder="name@example.com" type="text" value={email} onChange={e => checkEmail(e.target.value)} />
      </Form.Group>

      <Form.Group control_id="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="text" placeholder="MM-DD-YYYY" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button disabled={!(validUsername && validPassword && validEmail)} className="reg-btn" variant="primary" type="submit" onClick={handleCreateUser} >
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