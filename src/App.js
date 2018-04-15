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
import TweetItem from './TweetItem';

const BasicExample = () => (
  <Router>
    <div className="app-container">
    <Route path="/login" component={Login}/>
    <Route path="/tweet/:tweetId" component={TweetItem}/>
    <Route exact path="/" component={TweetListingScreen}/>
    </div>
  </Router>
)

export default BasicExample;
