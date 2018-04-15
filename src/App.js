import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from './Login';
import TweetListingScreen from './TweetListingScreen';
var clientToken = "",clientSecretToken = "";
const Home = function(){
  return(<div>
    <h2>Home</h2>
  </div>
)

}
  const login = () =>  {
    fetch('http://localhost:3001/login/twitter',{mode: 'no-cors',"Access-Control-Allow-Origin":"*",followAllRedirects: true
    })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      console.log("login response>>>",responseJson);
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });

  }



const About = () => (
  <div>
    <h2>About</h2>
  </div>
)



const Close = () => (
  <div/>
)

const BasicExample = () => (
  <Router>
    <div className="app-container">
    <Route path="/login" component={Login}/>
    <Route exact path="/" component={TweetListingScreen}/>
    </div>
  </Router>
)

export default BasicExample;
