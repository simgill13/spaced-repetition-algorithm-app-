
export const USER_DATA = 'USER_DATA';
export const userData = (displayName, googleId) => ({
  type: USER_DATA,
  displayName,
  googleId
})

export const matchGoogleToken = (accessToken) => (dispatch) => {
    fetch('/api/me', {
      headers:{
        authorization: `bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(json => {
    	dispatch(userData(json.displayName,json.googleId));
    })
    
}

export const USER_QUESTIONS = 'USER_QUESTIONS';
export const userQuestions = (arrayOfQuestions) => ({
  type: USER_QUESTIONS,
  arrayOfQuestions 
})

export const gettingQuestions = (accessToken) => (dispatch) => {
    fetch('/api/questions', {
      headers:{
        authorization: `bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(arrayOfQuestions => {
    	dispatch(userQuestions(arrayOfQuestions));
    })
}

export const INCREMENT_CURRENT_QUESTION_COUNTER = 'INCREMENT_COUNTER';
export const incrementCounter = () => ({
  type: INCREMENT_CURRENT_QUESTION_COUNTER,
})


export const RESET_CURRENT_QUESTION_COUNTER = 'RESET_CURRENT_QUESTION_COUNTER';
export const resetCurrentCounter = () => ({
  type: RESET_CURRENT_QUESTION_COUNTER,
})



export const POSTDATA = 'POSTDATA';
export const postData = (usersQuestions) => ({
  type: POSTDATA,
  usersQuestions
})



export const postUserQuestionArray = (googleId,array) => {

  return (dispatch) => {
    fetch(`/api/users/${googleId}/questions`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(array)
    })
    .then(response => {
      // console.log(response)
     return response.json()
    })
    .then(array => {
      console.log(array)
      dispatch(postData(array.usersQuestions))})
  }
}






export const SPLICE_ZERO_INDEX = 'SPLICE_ZERO_INDEX';
export const spliceZeroIndex = (i) => ({
  type: SPLICE_ZERO_INDEX,
  i
})
















