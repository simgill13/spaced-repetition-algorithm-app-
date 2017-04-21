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
    fetch(`/api/user/:${accessToken}`, {
      headers:{
        authorization: `bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(arrayOfQuestions => {
    	dispatch(userQuestions(arrayOfQuestions.usersQuestions));
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

export const SPLICE_ZERO_INDEX = 'SPLICE_ZERO_INDEX';
export const spliceZeroIndex = (i) => ({
  type: SPLICE_ZERO_INDEX,
  i
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
      return response.json()
    })
    .then(array => {
      dispatch(postData(array.usersQuestions))})
  }
}

export const ChangingMemoryValue = (googleId,i) => {
  return (dispatch) => {
    fetch(`/api/users/${googleId}/questions/memoryValue`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({i})
    })
    .then(response => {
      return response.json()
    })
    .then(array => {
      dispatch(newDataSet(array.usersQuestions))
    })
  }
}

export const pushBackInArray = (googleId,i) => {
  return (dispatch) => {
    fetch(`/api/users/${googleId}/questions/memoryValue2`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({i})
    })
    .then(response => {
      return response.json()
    })
    .then(array => {
      dispatch(newDataSet2(array.usersQuestions))

    })
  }
}

export const NEWDATASET2 = 'NEWDATASET2';
export const newDataSet2 = (usersQuestions2) => ({
  type: NEWDATASET2,
  usersQuestions2
})

export const NEWDATASET = 'NEWDATASET';
export const newDataSet = (usersQuestions) => ({
  type: NEWDATASET,
  usersQuestions
})

export const ChangingMemoryValueDecresing = (googleId,i) => {
  return (dispatch) => {
    fetch(`/api/users/${googleId}/questions/memoryValue/decreasing`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({i})
    })
    .then(response => {
      return response.json()
    })
    .then(array => {
      dispatch(newDataSetDec(array.usersQuestions))
    })
  }
}

export const NEWDATASETDEC = 'NEWDATASETDEC';
export const newDataSetDec = (usersQuestionsDec) => ({
  type: NEWDATASETDEC,
  usersQuestionsDec
})

export const INCREMENT_CORRECT = 'INCREMENT_CORRECT';
export const incrementCorrect = () => ({
  type: INCREMENT_CORRECT
})

export const INCREMENT_INCORRECT = 'INCREMENT_INCORRECT';
export const incrementIncorrect = () => ({
  type: INCREMENT_INCORRECT
})