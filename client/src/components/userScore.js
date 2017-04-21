import React from 'react';
import {connect} from 'react-redux';

class UserScore extends React.Component {
	constructor(props) {
		super(props);
	}

    render() {
        return (
            <div className="score-container">
                <div className="correct">
                    Correct: {this.props.correct}
                </div>
                <div className="incorrect">
                    Incorrect: {this.props.incorrect}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    correct: state.correct,
    incorrect: state.incorrect
});

export default connect(mapStateToProps)(UserScore);