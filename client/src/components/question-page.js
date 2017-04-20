import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import {incrementCounter,resetCurrentCounter} from '../actions/action';

 class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    }

    handleOnSubmit(e) {
        console.log(this.props.questions)
        console.log(this.props.currentQuestion)
        var form = document.getElementById("form");
        e.preventDefault();
        const userInput = e.target.userInput.value;
        this.checkCorrectAnswer(userInput)
        this.props.resetCurrentCounter();
        form.reset();
    }

    checkCorrectAnswer(userInput) {

        let i = this.props.currentQuestion;
        let mVal = this.props.questions[i].memoryValue;
        
        if(this.props.questions[i].english.toLowerCase() == userInput.toLowerCase()) {
            alert('correct!')
            mVal *= 2
            console.log('mVal', mVal)
            this.props.questions.push(this.props.questions.shift())
             this.props.incrementCurrentQuestion();

        } 
        else {
            alert('WRONG')
            let item = this.props.questions[i]

            this.props.questions.splice(i,1)
            this.props.questions.splice(1,0,item)
            this.props.incrementCurrentQuestion();


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
  },
  resetCurrentCounter() {
    dispatch(resetCurrentCounter())
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);










