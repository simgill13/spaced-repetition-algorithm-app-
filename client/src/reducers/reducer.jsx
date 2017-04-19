import {
 USER_DATA,
 USER_QUESTIONS
} from '../actions/action';

const initialState = {
    questions: [],
    displayName: 'yo',
    googleId:'',
    currentUser: null,
    isLoggedIn: false
}

export default (state = initialState, action) => {
	switch(action.type) {
		case USER_DATA:
			return Object.assign({}, state, {
				displayName: action.displayName,
				googleId: action.googleId,
				currentUser:action.googleId
			})
		case USER_QUESTIONS:
			return Object.assign({}, state, {
				questions: action.arrayOfQuestions,
			})
		default:
	    	return state;
	}
}