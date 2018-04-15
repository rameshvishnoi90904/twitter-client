import React, { Component } from "react";
import TwitterLogin from "react-twitter-auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setClienToken } from "./actions/index";

class Login extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { clientToken, clientSecretToken } = this.props;
		console.log(clientToken, clientSecretToken);
		if (clientToken !== "") {
			return (
				<Redirect
					to={{
						pathname: "/"
					}}
				/>
			);
		}

		return (
			<div className="App">
				<TwitterLogin
					loginUrl="http://localhost:3001/api/v1/auth/twitter"
					onFailure={this.onFailed}
					onSuccess={this.onSuccess}
					requestTokenUrl="http://localhost:3001/api/v1/auth/twitter/reverse"
				/>
			</div>
		);
	}

	onSuccess = response => {
		response.json().then(token => {
			console.log("onSuccess", token);
			const clientToken = token.oauth_token;
			const clientSecretToken = token.oauth_token_secret;
			this.props.dispatch(
				setClienToken({
					clientToken: clientToken,
					clientSecretToken: clientSecretToken
				})
			);
		});
	};
	onFailed = error => {
		console.log("onFailed", error);
	};
}

const mapStateToProps = state => ({
	clientToken: state.clientToken,
	clientSecretToken: state.clientSecretToken
});
export default connect(mapStateToProps)(Login);
