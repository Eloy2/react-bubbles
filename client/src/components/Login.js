import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ creds, setCreds ] = useState({ username: "", password: "" });

  const handleChange = e => {
      setCreds({
          ...creds,
          [e.target.name]: e.target.value
      })
  }

  const login = e => {
      e.preventDefault();
      axios
          .post('http://localhost:5000/api/login', creds)
          .then(res => {
              window.localStorage.setItem('token', res.data.payload);
              props.history.push('/BubblePage'); //can we use anything else?
          })
          .catch(err => console.log("login error", err))
      console.log(props);
  }

  return (
    <>
      <form onSubmit={login}>
          <input
          type="text"
          name="username"
          placeholder="username"
          value={creds.username}
          onChange={handleChange}
          />
          <br/>
          <input
          type="password"
          name="password"
          placeholder="password"
          value={creds.password}
          onChange={handleChange}
          />
          <br/>
          <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
