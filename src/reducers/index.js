import {
	ADD_TWEET,
	AJAX_CALL_START,
	AJAX_CALL_STOP,
	SELECT_TWEET,
	SET_CLIENT_TOKEN
} from "../constants/action-types";
const initialState = {
	isLoading: true,
	tweetList: [],
	selectedTweet: null,
	clientToken: "",
	clientSecretToken: ""
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TWEET:
			let newTweets = action.payload.map(item => {
				item.noOfView = 0;
				return item;
			});
			return {
				...state,
				isLoading: false,
				tweetList: [...state.tweetList, ...newTweets]
			};
		case AJAX_CALL_START:
			return {
				...state,
				isLoading: true
			};
		case AJAX_CALL_STOP:
			return {
				...state,
				isLoading: false
			};
		case SELECT_TWEET:
			let selectedTweet = action.payload;
			selectedTweet.noOfView++;
			return {
				...state,
				tweetList: [...state.tweetList, selectedTweet],
				selectedTweet: selectedTweet
			};
		case SET_CLIENT_TOKEN:
			return {
				...state,
				clientToken: action.payload.clientToken,
				clientSecretToken: action.payload.clientSecretToken
			};
		default:
			return state;
	}
};

export default rootReducer;
