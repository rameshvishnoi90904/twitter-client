import React, { Component } from "react";
import {
  Redirect,
  withRouter
} from "react-router-dom";
export default class TweetItem extends Component {
	constructor(props) {
		super(props);
		this.state = {isLoading: false};
	}
  componentDidMount(){
  }
	render() {
    let toRender= "";
    if(this.state.isLoading){
      toRender =  (
        <div className="loader"/>
      )
    }

    //
    // if (!this.props.location.state) {
    //   return <Redirect to={{pathname:"/login"}} />;
    // }
    // if(this.state.selectedTweet){
    //   return <Redirect to={{pathname:"/login"}} />;
    //
    // }
    //
    // toRender = this.state.tweetList.map(function (tweetItem) {
    //   return(
    //     <li key={tweetItem.id} className="tweet-item" onClick={(tweetItem)=> navigateToTweet(tweetItem)}>
    //       {tweetItem.text}
    //     </li>
    //   )
    // });
    console.log(this.props.location.state);
    let user = this.props.location.state.user;
		return (
			<div className="tweet-screen">
        <div className='tweet-owner-container'>
          <div>{user.screen_name}</div>
          <img src={user.profile_image_url} className='user-profile-image'/>
        </div>
        <div className='tweet-text'>{this.props.location.state.text}</div>
			</div>
		);
	}

}
