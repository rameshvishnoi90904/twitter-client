import React from "react";
import styles from "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import TweetListingScreen from "./TweetListingScreen";
import TweetItem from "./TweetItem";
import store from "./store/index";
import { Provider } from "react-redux";

const BasicExample = () => (
	<Provider store={store}>
		<Router>
			<div className="app-container">
				<Route path="/login" component={Login} />
				<Route path="/tweet/:tweetId" component={TweetItem} />
				<Route exact path="/" component={TweetListingScreen} />
			</div>
		</Router>
	</Provider>
);

export default BasicExample;
