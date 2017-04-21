import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import $ from 'jquery';
import UserScore from './userScore';
import {postUserQuestionArray,
        spliceZeroIndex,
        userMemoryValue,
        ChangingMemoryValue,
        gettingQuestions,
        ChangingMemoryValueDecresing,
        pushBackInArray,
        incrementCorrect,
        incrementIncorrect
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
        let i = this.props.currentQuestionIndex; //starts at 0
        const currentMValue = this.props.questions[i].memoryValue
        
        if(this.props.questions[i].english.toLowerCase() === userInput.toLowerCase()) {
            $(function(){
                color();
                function color(){
                    $("body").css("background", "linear-gradient(23deg, #1D976C , #93f9b9)");
                }
                setTimeout(() => revertColor(), 500);
                function revertColor() {
                    $("body").css("background", "#F0F0F2");
                }   
            })
            this.props.incrementCorrect();
            this.props.ChangingMemoryValue(googleId,i);             
        } 
        else {
            $(function(){
                color();
                function color(){
                    $("body").css("background", "linear-gradient(23deg, #e53935 , #e35d5b)");
                }
                setTimeout(() => revertColor(), 500);
                function revertColor() {
                    $("body").css("background", "#F0F0F2");
                }   
            })
            this.props.incrementIncorrect();
            this.props.ChangingMemoryValueDecresing(googleId,i)
        }
    }

    render() {
        const s = (this.props.questions.length !== 0) ? this.props.questions[this.props.currentQuestionIndex].spanish: "Loading ...";

        return (
            <div>
                <UserScore />
                <div className="questions">
                    <p className="spanish">Spanish</p>
                    <p className="spanishWord">{s}</p>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="answer">
                    <p className="english">English</p>
                    <form id="form" onSubmit={e => this.SubmitClick(e)}>
                        <input type="text" id="input_text" placeholder="Answer Here" name="userInput" required/>
                        <input type="submit" className="userSubmit"/>
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
  incrementCorrect() {
      dispatch(incrementCorrect())
  },
  incrementIncorrect() {
      dispatch(incrementIncorrect())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);