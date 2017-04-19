import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import {incrementCounter} from '../actions/action';

 class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const userInput = e.target.userInput.value;
        this.checkCorrectAnswer(userInput)
        this.props.incrementCurrentQuestion();
        console.log(userInput)
        
    }

    checkCorrectAnswer(userInput) {
        let i = this.props.currentQuestion;
        console.log('question', this.props.questions[i].english)
        console.log('i', i)
        if(this.props.questions[i].english.toLowerCase() == userInput.toLowerCase()) {
            console.log('correct!')
        } else {
            console.log('WRONG')
        }
    }


    render() {
        let i = this.props.currentQuestion;
        let s = this.props.questions[i].spanish; 
        
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
                    <form onSubmit={e => this.handleOnSubmit(e)}>
                        <input type="text" id="input_text" placeholder="Answer Here" name="userInput"/>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions,
    currentQuestion: state.currentQuestion
});
const mapDispatchToProps = (dispatch) => ({
  incrementCurrentQuestion() {
    dispatch(incrementCounter())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);