import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './user-view-edit.scss';

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import DatePicker from "react-datepicker";
import axios from "axios";

export function UserViewEdit(props) {
  const [username, setUsername] = useState(`${localStorage.getItem("user")}`);
  const [password, setPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [email, setEmail] = useState("");
  // const [birthday, setBirthday] = useState("");
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
        // setBirthday(response.data[0].Birthday);
        let date = new Date(response.data[0].Birthday)
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
    let token = localStorage.getItem("token");


    // Convert birthdayClean to the format of birthday in DB: YYYY-MM-DDT00:00:00.000Z
    let cleanDate = new Date(birthdayClean)
    let birthday = cleanDate.getUTCFullYear() + "-" + cleanDate.getUTCMonth() + "-" + cleanDate.getUTCDate() + "T00:00:00.000Z"

    /* send request for account info update */
    // Modify this call and API function so that the new and current passwords are both passed to the API,
    // then the API looks for a user with both the usernameStart and password
    // and then from there will update that user with the username and newPassword.


    axios.post("https://lht-my-cinema.herokuapp.com/login", {
      Username: usernameStart,
      Password: password
    })
      .then(response => {
        const loginData = response.data;
        console.log(loginData);
        props.onLoggedIn(loginData);
        if (newPassword1 === newPassword2) {
          axios.put(`https://lht-my-cinema.herokuapp.com/users/${usernameStart}`,
            {
              Username: username,
              Password: newPassword1,
              Email: email,
              Birthday: birthdayClean
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
            .then(response => {
              console.log(response.data);
              console.log("Username: " + { username });
              console.log("Email: " + { email });
              console.log("Birthday: " + { birthday });

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
                  console.log("Error Logging in with new credentials");
                  console.log(e);
                })
            })
            .catch(e => {
              console.log("Token: " + token);
              console.log("Error Editing Info");
              console.log(e);
              // window.open("/", "_self")
            });
        }
      })
      .catch(e => {
        console.log("Incorrect Password");
        console.log(e);
      })
  };

  return (
    <Form className="user-view-edit">
      {/* className="form-inline" causes the label and value to be side by side, not responsive at moderately low screen widths */}
      <Form.Group className="form-inline" control_id="form-username">
        <Form.Label className="user-view-edit-label">New Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group className="form-inline" control_id="form-new-password">
        <Form.Label className="user-view-edit-label">New Password:</Form.Label>
        <Form.Control type="password" value={newPassword1} onChange={e => setNewPassword1(e.target.value)} />
      </Form.Group>

      <Form.Group className="form-inline" control_id="form-new-password-confirm">
        <Form.Label className="user-view-edit-label">Confirm New Password:</Form.Label>
        <Form.Control type="password" value={newPassword2} onChange={e => setNewPassword2(e.target.value)} />
      </Form.Group> <br />

      <Form.Group className="form-inline" control_id="form-email">
        <Form.Label className="user-view-edit-label">New E-Mail:</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="form-inline" control_id="form-date">
        <Form.Label className="user-view-edit-label">New Birthday:</Form.Label>
        <Form.Control type="text" value={birthdayClean} onChange={e => setBirthdayClean(e.target.value)} />
      </Form.Group> <br />

      <Form.Group className="form-inline" control_id="form-password">
        <Form.Label className="user-view-edit-label">Confirm Current Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
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