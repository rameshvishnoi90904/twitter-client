import React, { Component } from "react";
import {
  Redirect,
  withRouter
} from "react-router-dom";
export default class TweetListingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {isLoading: true,tweetList:[]};
	}
  componentDidMount(){

    if(this.props.location.state && this.props.location.state.clientToken){
      this.getTweetList();
    }
  }
	render() {
    let toRender= "";
    if(this.state.isLoading){
      toRender =  (
        <div className="loader"/>
      )
    }


    if (!this.props.location.state) {
      return <Redirect to={{pathname:"/login"}} />;
    }

		return (
			<div className="App">
      {toRender}
			</div>
		);
	}

  getTweetList = () => {
    fetch('http://localhost:3001/getTweetList/',{
      headers: new Headers({
        "clientToken": this.props.location.state.clientToken, "clientSecretToken": this.props.location.state.clientSecretToken
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        isLoading:false,
        tweetList: responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });

  }

}
