import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import {incrementCounter,
        resetCurrentCounter,
        postUserQuestionArray,
        spliceZeroIndex,
        userMemoryValue,
        ChangingMemoryValue,
        gettingQuestions,
        ChangingMemoryValueDecresing,
        pushBackInArray
} from '../actions/action';

 class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.SubmitClick = this.SubmitClick.bind(this);
        this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    }

    SubmitClick(e) {
        var form = document.getElementById("form");
        e.preventDefault();
        const userInput = e.target.userInput.value;
        form.reset();
        this.checkCorrectAnswer(userInput)

 
    }

    checkCorrectAnswer(userInput) {
        let googleId= this.props.googleId;
        const accessToken = Cookies.get('accessToken');
        let i = this.props.currentQuestionIndex; //stats at 0
        const currentMValue = this.props.questions[i].memoryValue
        console.log(currentMValue)
        
        
        if(this.props.questions[i].english.toLowerCase() == userInput.toLowerCase()) {
            alert('this is correct')
            let item = this.props.questions[i]
            // this.props.incrementCurrentQuestion(); 
            this.props.ChangingMemoryValue(googleId,i); 
            // this.props.pushBackInArray(googleId,i)
            // function(googleId,i)
            
        } 
        else {
            let item = this.props.questions[i]
            alert('no this is not correct')
            // this.props.incrementCurrentQuestion(); 
            this.props.ChangingMemoryValueDecresing(googleId,i)
            

            
           
        }
    }



    render() {
        console.log(this.props.questions)

        const s = (this.props.questions.length !== 0) ? this.props.questions[this.props.currentQuestionIndex].spanish: 
                                        console.log('there is no data in this.props.questions')
                                        "Loading ...";



        
        return (
            <div>
                <div className="questions">
                    <p>Display word here</p>
                    {s}
                </div>
                <br/>
                <br/>
                <br/>
                <div className="answer">

                    <form id="form" onSubmit={e => this.SubmitClick(e)}>
                        <input type="text" id="input_text" placeholder="Answer Here" name="userInput" required/>
                        <input type="submit" />
                    </form>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions,
    currentQuestionIndex: state.currentQuestionIndex,
    googleId:state.googleId

});
const mapDispatchToProps = (dispatch) => ({
  incrementCurrentQuestion() {
    dispatch(incrementCounter())
  },
  resetCurrentCounter() {
    dispatch(resetCurrentCounter())
  },
  postUserQuestionArray(googleId,array) {
    dispatch(postUserQuestionArray(googleId,array))
  },
  spliceZeroIndex(i) {
    dispatch(spliceZeroIndex(i))
  },
    userMemoryValue(i) {
    dispatch(userMemoryValue(i))
  },
    ChangingMemoryValue(googleId,i) {
    dispatch(ChangingMemoryValue(googleId,i))
  },
   gettingQuestions(accessToken) {
    dispatch(gettingQuestions(accessToken))
  },
   ChangingMemoryValueDecresing(googleId,i) {
    dispatch(ChangingMemoryValueDecresing(googleId,i))
  },
   pushBackInArray(googleId,i) {
    dispatch(pushBackInArray(googleId,i))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);










