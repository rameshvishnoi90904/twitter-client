import {
	ADD_TWEET,
	AJAX_CALL_START,
	AJAX_CALL_STOP,
	SELECT_TWEET,
	SET_CLIENT_TOKEN
} from "../constants/action-types";
const addTweet = article => ({ type: ADD_TWEET, payload: article });
const networktCallStart = () => ({ type: AJAX_CALL_START });
const networktCallStop = () => ({ type: AJAX_CALL_STOP });
const selectTweet = tweetItem => ({
	type: SELECT_TWEET,
	payload: tweetItem
});

const setClienToken = tokenObject => ({
	type: SET_CLIENT_TOKEN,
	payload: tokenObject
});

export {
	addTweet,
	networktCallStart,
	networktCallStop,
	selectTweet,
	setClienToken
};
