import {
 USER_DATA,
 USER_QUESTIONS,
 INCREMENT_CURRENT_QUESTION_COUNTER,
 RESET_CURRENT_QUESTION_COUNTER,
 POSTDATA,
 SPLICE_ZERO_INDEX
} from '../actions/action';

const initialState = {
    questions: [],
    displayName: 'yo',
    googleId:'',
    currentUser: null,
    isLoggedIn: false,
	currentQuestion: 0
}

export default (state = initialState, action) => {
	switch(action.type) {
		case USER_DATA:
			return Object.assign({}, state, {
				displayName: action.displayName,
				googleId: action.googleId,
				currentUser:action.googleId
			});
		case USER_QUESTIONS:
			return Object.assign({}, state, {
				questions: action.arrayOfQuestions,
			});
		case INCREMENT_CURRENT_QUESTION_COUNTER:
			return Object.assign({}, state, {
				currentQuestion: state.currentQuestion + 1
			});
			case RESET_CURRENT_QUESTION_COUNTER:
			return Object.assign({}, state, {
				currentQuestion: 0
			});
			case POSTDATA:
			return Object.assign({}, state, {
				questions: action.array
			});
			case SPLICE_ZERO_INDEX:
			return Object.assign({}, state, {
				questions: [...state.questions.slice(1,5),state.questions[0],...state.questions.slice(5)]
			});
		default:
	    	return state;
	}
}