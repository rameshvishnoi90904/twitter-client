import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addTweet, networktCallStart, selectTweet } from "./actions/index";
class TweetListingScreen extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (this.props.isLoggedIn) {
			this.getTweetList();
		}
	}
	render() {
		let toRender = "";
		if (!this.props.isLoggedIn) {
			return <Redirect to={{ pathname: "/login" }} />;
		}
		if (this.props.isLoading) {
			return (
				<div className="App">
					<div className="loader" />
				</div>
			);
		}

		if (this.props.selectedTweet) {
			return (
				<Redirect
					push={true}
					to={{
						pathname: "/tweet/" + this.props.selectedTweet.id
					}}
				/>
			);
		}
		toRender = this.props.tweetList.map(tweetItem => {
			return (
				<li
					key={tweetItem.id}
					className="tweet-item"
					onClick={() => this.navigateToTweet(tweetItem)}>
					<div className="user-details">
						<img
							src={tweetItem.user.profile_image_url}
							className="user-profile-image"
						/>
						<div className="tweet-user-name">
							{tweetItem.user.name}
						</div>
					</div>
					<div className="tweet-text">{tweetItem.text}</div>
					<div className="no-of-tweet">
						{"No Of Views: " + tweetItem.noOfView}
					</div>
				</li>
			);
		}, this);

		return (
			<div className="App">
				<ul className="tweet-list-container">
					{toRender}
					<div
						className="load-more"
						onClick={() => this.loadMoreTweet()}>
						<div className="button">load more</div>
					</div>
				</ul>
			</div>
		);
	}
	navigateToTweet(tweetItem) {
		this.props.dispatch(selectTweet(tweetItem));
	}
	loadMoreTweet() {
		var fromId =
			this.props.tweetList.length > 0
				? this.props.tweetList[this.props.tweetList.length - 1].id
				: 0;
		this.getTweetList(fromId);
	}
	getTweetList = (fromId = 0) => {
		this.props.dispatch(networktCallStart());
		fetch("http://localhost:3001/getTweetList?fromId=" + fromId, {
			headers: new Headers({
				clientToken: this.props.clientToken,
				clientSecretToken: this.props.clientSecretToken
			})
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				this.props.dispatch(addTweet(responseJson));
			})
			.catch(error => {
				console.error(error);
			});
	};
}

const mapStateToProps = state => ({
	tweetList: state.tweetList,
	isLoading: state.isLoading,
	selectedTweet: state.selectedTweet,
	isLoggedIn: state.clientToken !== "",
	clientToken: state.clientToken,
	clientSecretToken: state.clientSecretToken
});
export default connect(mapStateToProps)(TweetListingScreen);
