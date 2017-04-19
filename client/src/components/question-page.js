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
        var form = document.getElementById("form");
        e.preventDefault();
        const userInput = e.target.userInput.value;
        this.checkCorrectAnswer(userInput)
        this.props.incrementCurrentQuestion();
        console.log(userInput)
        form.reset();
    }

    checkCorrectAnswer(userInput) {
        let i = this.props.currentQuestion;
        
        if(this.props.questions[i].english.toLowerCase() == userInput.toLowerCase()) {
            alert('correct!')
            this.props.questions.push(this.props.questions.shift())
        } 
        else {
            let item = this.props.questions[i]
            alert('WRONG')
            this.props.questions.splice(2,0,item)
            console.log('second',this.props.questions[i])
        }
    }


    render() {
        console.log(this.props.questions)
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
    currentQuestion: state.currentQuestion
});
const mapDispatchToProps = (dispatch) => ({
  incrementCurrentQuestion() {
    dispatch(incrementCounter())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);