import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import {gettingQuestions} from '../actions/action';



 class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
         this.componentWillMount=this.componentWillMount.bind(this);
    }



    componentWillMount() {
        const accessToken = Cookies.get('accessToken');
        // this.props.getQuestions(accessToken);   
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

const mapDispatchToProps = (dispatch) => ({
    getQuestions(accessToken) {
        dispatch(gettingQuestions(accessToken));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);