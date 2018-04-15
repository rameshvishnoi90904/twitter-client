import React, { Component } from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
export default class TweetListingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {isLoading: true,tweetList:[],selectedTweet:null};
	}
  componentDidMount(){

    if(this.props.location.state && this.props.location.state.clientToken){
      this.getTweetList();
    }
  }
	render() {
    let toRender= "";
    if (!this.props.location.state) {
      return <Redirect to={{pathname:"/login"}} />;
    }
    if(this.state.isLoading){
      return(
        <div className="App">
          <div className="loader"/>
        </div>
      )
    }


    if(this.state.selectedTweet){
      return <Redirect push={true} to={{pathname:"/tweet/"+this.state.selectedTweet.id, state:{...this.state.selectedTweet}}} />;

    }

    toRender = this.state.tweetList.map(function (tweetItem) {
      return(
        <li key={tweetItem.id} className="tweet-item" onClick={() => this.navigateToTweet(tweetItem)}>
          {tweetItem.text}
        </li>
      )
    },this);

		return (
			<div className="App">
        <ul className="tweet-list-container">
          {toRender}
          <li className="tweet-item load-more">
            <div className='button'>load more</div>
          </li>
        </ul>
			</div>
		);
	}
  navigateToTweet(tweetItem){
    this.setState({selectedTweet: tweetItem});
  }
  getTweetList = () => {
    fetch('http://localhost:3001/getTweetList?fromId=0',{
      headers: new Headers({
        "clientToken": this.props.location.state.clientToken, "clientSecretToken": this.props.location.state.clientSecretToken
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
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
