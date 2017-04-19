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
                </div>
                <br/>
                <br/>
                <br/>
                <div className="answer">
                    <p>answer here </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions

});

export default connect(mapStateToProps)(QuestionPage);