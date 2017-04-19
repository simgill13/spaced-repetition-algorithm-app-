import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import {incrementCounter} from '../actions/action';

 class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {
        e.preventDefault();
        this.props.incrementCurrentQuestion();
        console.log(this.props.currentQuestion);
    }

    render() {
        console.log(this.props)
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
                    <form>
                        <input type="text" id="input_text" placeholder="Answer Here" />
                        <input type="submit" onClick={e => this.handleOnClick(e)}/>
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