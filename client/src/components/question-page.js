import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import {gettingQuestions} from '../actions/action';

 class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let s = this.props.questions[0].spanish
        console.log(s)

        return (
            <div>
                <div className="questions">
                    <p>Display word here</p>
                    <p>{s}</p>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="answer">
                    <input type="text" id="input_text" placeholder="Answer Here" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions

});

export default connect(mapStateToProps)(QuestionPage);