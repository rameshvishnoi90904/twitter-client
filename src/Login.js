import React, { Component } from "react";
import TwitterLogin from 'react-twitter-auth';
import {
  Redirect,
  withRouter
} from "react-router-dom";
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {  isLoginSuccess: false};
	}
	render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { isLoginSuccess,clientToken,clientSecretToken } = this.state;

    if (isLoginSuccess) {
      return <Redirect to={{pathname:"/",state:{clientToken,clientSecretToken}}} />;
    }

		return (
			<div className="App">
        <TwitterLogin loginUrl="http://localhost:3001/api/v1/auth/twitter"
                      onFailure={this.onFailed} onSuccess={this.onSuccess}
                      requestTokenUrl="http://localhost:3001/api/v1/auth/twitter/reverse"/>
			</div>
		);
	}

  onSuccess = (response) => {
    response.json().then((token)=>{
      console.log("onSuccess", token);
      const clientToken =  token.oauth_token;
      const clientSecretToken =  token.oauth_token_secret;
      this.setState({isLoginSuccess:true,clientToken:clientToken,clientSecretToken:clientSecretToken});
    });
  }
  onFailed = (error) => {
    console.log("onFailed",error);
  }

}
