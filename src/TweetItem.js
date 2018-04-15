import React, { Component } from "react";
import { connect } from "react-redux";

class TweetItem extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		// if (!this.props.location.state) {
		//   return <Redirect to={{pathname:"/login"}} />;
		// }

		let user = this.props.selectedTweet.user;
		return (
			<div className="tweet-screen">
				<div className="tweet-owner-container">
					<img
						src={user.profile_image_url}
						className="user-profile-image"
					/>
					<div>{user.screen_name}</div>
				</div>
				<div className="tweet-text">
					{this.props.selectedTweet.text}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedTweet: state.selectedTweet
});
export default connect(mapStateToProps)(TweetItem);
