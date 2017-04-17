import * as actions from '../actions/action';


const initialState = {
    questions: [],
    displayName: '',
    currentUser: null,
    isLoggedIn: false
}

export default (state=initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}