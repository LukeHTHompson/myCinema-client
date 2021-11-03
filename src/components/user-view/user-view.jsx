import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './user-view.scss';

import { Link } from "react-router-dom";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import { MovieCard } from "../movie-card/movie-card";
import Modal from "react-bootstrap/Modal";

export function UserView(props) {

  const [username, setUsername] = useState(`${props.user}`);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayClean, setBirthdayClean] = useState("");
  const [favMovies, setFavMovies] = useState([]);
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Call API endpoint to delete your own account, password validation required
  const handleDelete = () => {
    console.log("check localstorage for username to delete");
    console.log("Call delete account API");
    axios.post("https://lht-my-cinema.herokuapp.com/login", {
      Username: username,
      Password: password
    })
      .then(response => {
        console.log(response);
        axios.delete(`https://lht-my-cinema.herokuapp.com/users/${username}`,
          { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            console.log(response);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            handleClose();
            window.open("/", "_self");
          })
          .catch(error => {
            console.log(error);
            console.log("An error prevented your account from being deleted.")
            handleClose();
          })
      })
      .catch(error => {
        console.log(error);
        console.log("Incorrect password. Account deletion prevented.")
        handleClose();
      })
  }


  useEffect(() => {
    // let token = localStorage.getItem("token");
    axios.get(`https://lht-my-cinema.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // console.log(response);
        // assign the results
        setUsername(response.data[0].Username);
        setEmail(response.data[0].Email);
        setBirthday(response.data[0].Birthday);
        setFavMovies(response.data[0].FavoriteMovies);
        console.log(response.data[0].Username + " | ", response.data[0].Email + " | ", response.data[0].Birthday)
        let date = new Date(response.data[0].Birthday)
        setBirthdayClean(date.getUTCMonth() + 1 + "-" + date.getUTCDate() + "-" + date.getUTCFullYear())
      })
      .catch(function (error) {
        console.log(error + " test");
      })
  }, [token])

  return (
    <div className="user-view">


      <div className="user-view-top">
        <div className="user-view-title">
          <h2>Profile Information</h2> <br />
        </div>
        <div className="user-view-info">
          <span className="user-info-label">Username: </span><span className="user-info-value">{username}</span><span></span> <br />
          <span className="user-info-label">Email: </span><span className="user-info-value">{email}</span><span></span> <br />
          <span className="user-info-label">Birthdate: </span><span className="user-info-value">{birthdayClean}</span><span></span> <br /> <br />
        </div>

        <div className="user-view-actions">
          {/* Edit Info should require a fresh login to ensure that the user wants to make changes */}
          <Link to={`/users/${username}/edit`}>
            <Button className="user-view-edit-button" variant="warning" type="button" >Edit Information</Button>
          </Link>
          <br />
          <Button className="user-view-delete-button" variant="danger" type="button" onClick={handleShow}>Delete Account</Button>
          <br />
        </div>

        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          {/* Using closeButton on Modal.Header is not displaying properly, removing for now */}
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your password is required to delete this account:
            <input className="modal-password" type="password" onChange={e => setPassword(e.target.value)}></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>Back</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>

        <div className="user-view-home">
          {/* Add a button here that will take them back to the full movie list homepage */}
          <Link to={`/`} className="user-home">Home</Link>
        </div>
        <br />
      </div>

      <div>
        <h2>Favorite Movies: </h2>
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