import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import {incrementCounter,resetCurrentCounter,postUserQuestionArray,spliceZeroIndex} from '../actions/action';

 class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    }

    handleOnSubmit(e) {
        // let array = this.props.questions;
        // let googleId= this.props.googleId;
        var form = document.getElementById("form");
        e.preventDefault();
        const userInput = e.target.userInput.value;
        this.checkCorrectAnswer(userInput)
        this.props.resetCurrentCounter();
        form.reset();
      
    }

    checkCorrectAnswer(userInput) {
        let googleId= this.props.googleId;
        let i = this.props.currentQuestion;
        let mVal = this.props.questions[0].memoryValue;
        let array = this.props.questions;
        console.log(array)
        console.log(mVal)
        
        if(this.props.questions[i].english.toLowerCase() == userInput.toLowerCase()) {
            let mVal = this.props.questions[i].memoryValue;
            alert('correct!')
            mVal *= 2
            console.log('mVal', mVal)
            this.props.questions.push(this.props.questions.shift());
            this.props.incrementCurrentQuestion();

            this.props.postUserQuestionArray(array,googleId);
        } 
        else {
            alert('WRONG')
            let item = this.props.questions[i]


            //dispatch an action to splice ( i, 0)

            // this.props.questions.splice(i,1)
            // this.props.questions.splice(1,0,item)
            this.props.spliceZeroIndex(i)
            this.props.incrementCurrentQuestion();


            // dispatch asyn action dec action


        }
    }


    render() {
        let i = this.props.currentQuestion;
        let s = this.props.questions[i].spanish; 
        console.log('questions array', this.props.questions)
        
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
                    <form id="form" onSubmit={e => this.handleOnSubmit(e)}>
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
    currentQuestion: state.currentQuestion,
    googleId:state.googleId

});
const mapDispatchToProps = (dispatch) => ({
  incrementCurrentQuestion() {
    dispatch(incrementCounter())
  },
  resetCurrentCounter() {
    dispatch(resetCurrentCounter())
  },
  postUserQuestionArray(array,googleId) {
    dispatch(postUserQuestionArray(array,googleId))
  },
  spliceZeroIndex(i) {
    dispatch(spliceZeroIndex(i))
  },


})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);










