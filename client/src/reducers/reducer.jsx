import {
 USER_DATA,
 USER_QUESTIONS,
 INCREMENT_CURRENT_QUESTION_COUNTER,
 RESET_CURRENT_QUESTION_COUNTER,
 POSTDATA,
 SPLICE_ZERO_INDEX,
 CHANGE_USER_MEM_VALUE,
 NEWDATASET,
 NEWDATASETDEC,
 NEWDATASET2,
 INCREMENT_CORRECT,
 INCREMENT_INCORRECT,
} from '../actions/action';

const initialState = {
    questions: [],
    displayName: 'yo',
    googleId:'',
    currentUser: null,
    isLoggedIn: false,
	currentQuestionIndex: 0,
	correct: 0,
	incorrect: 0
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
				currentQuestionIndex: state.currentQuestionIndex + 1
			});
		case RESET_CURRENT_QUESTION_COUNTER:
			return Object.assign({}, state, {
				currentQuestionIndex: 0
			});
		case POSTDATA:
			return Object.assign({}, state, {
				questions: action.usersQuestions
			});
		case SPLICE_ZERO_INDEX:
			return Object.assign({}, state, {
				questions: [...state.questions.slice(1,5),state.questions[0],...state.questions.slice(5)]
			});
		case CHANGE_USER_MEM_VALUE:
			return Object.assign({}, state, {
				questions: [state.questions[0].memoryValue*=2,...state.questions.slice(1,9)]
			});
		case NEWDATASET:
			return Object.assign({}, state, {
				questions: action.usersQuestions
			});
		case NEWDATASETDEC:
			return Object.assign({}, state, {
				questions: action.usersQuestionsDec
			});
		case NEWDATASET2:
			return Object.assign({}, state, {
				questions: action.usersQuestions2
			});
		case INCREMENT_CORRECT:
			return Object.assign({}, state, {
				correct: state.correct + 1
			});
			case INCREMENT_INCORRECT:
			return Object.assign({}, state, {
				incorrect: state.incorrect + 1
			});
		default:
	    	return state;
	}
}