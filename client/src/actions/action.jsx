
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
      console.log(arrayOfQuestions)
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



// export const postUserQuestionArray = (googleId,array) => {

//   return (dispatch) => {
//     fetch(`/api/users/${googleId}/questions`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(array)
//     })
//     .then(response => {
//       // console.log(response)
//      return response.json()
//     })
//     .then(array => {
//       console.log(array)
//       dispatch(postData(array.usersQuestions))})
//   }
// }






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
      // console.log(response)
     return response.json()
    })
    .then(array => {
      console.log('this is the server data ',array)
      dispatch(postData(array.usersQuestions))})
  }
}

//=================================================================================

//dispatching an action to change the memory value of the current question

// export const CHANGE_USER_MEM_VALUE = 'CHANGE_USER_MEM_VALUE';
// export const userMemoryValue = (i) => ({
//   type: CHANGE_USER_MEM_VALUE,
//   i
// })

// rethinking strategy

// the data needs to change on the server side



export const ChangingMemoryValue = (googleId,i) => {
  console.log(i)

  return (dispatch) => {
    fetch(`/api/users/${googleId}/questions/memoryValue`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({i})
    })
    .then(response => {
      // console.log(response)
     return response.json()
    })
    .then(array => {
      console.log('ChangingMemoryValue ',array)
      dispatch(newDataSet(array.usersQuestions))

    })
  }
}




export const pushBackInArray = (googleId,i) => {
  console.log(i)

  return (dispatch) => {
    fetch(`/api/users/${googleId}/questions/memoryValue2`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({i})
    })
    .then(response => {
      // console.log(response)
     return response.json()
    })
    .then(array => {
      console.log('ChangingMemoryValue ',array)
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
  console.log(i)

  return (dispatch) => {
    fetch(`/api/users/${googleId}/questions/memoryValue/decreasing`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({i})
    })
    .then(response => {
      // console.log(response)
     return response.json()
    })
    .then(array => {
      console.log('ChangingMemoryValue ',array)
      dispatch(newDataSetDec(array.usersQuestions))

    })
  }
}


export const NEWDATASETDEC = 'NEWDATASETDEC';
export const newDataSetDec = (usersQuestionsDec) => ({
  type: NEWDATASETDEC,
  usersQuestionsDec
})
