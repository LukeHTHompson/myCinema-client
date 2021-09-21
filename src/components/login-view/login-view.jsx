import React, { useState } from "react";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    event.preventDefault();
    console.log("U: " + username, "P: " + password);
    /* send request for auth */
    props.onLoggedIn(username);
  };

  const handleRegister = () => {
    console.log("TEST");
    props.onRegisterButton(1);
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Sign In
      </button>
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </form>
  );
}