import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import $ from 'jquery';
import QuestionPage from './question-page';
import LoginPage from './login-page';
import Nav from './nav';
import {matchGoogleToken, gettingQuestions} from '../actions/action';

class App extends React.Component {
    constructor(props) {
        super(props);  
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.props.dispatch(matchGoogleToken(accessToken));
            this.props.dispatch(gettingQuestions(accessToken));
            $(function(){
                color();
                function color(){
                    $("body").css("background", "#F0F0F2");
                }   
            })
        }     
    }

    render() {
        if (!this.props.currentUser) {
            return <LoginPage />;
        }
        const checkQuestionsArray = (this.props.questions.length !== 0) ? <QuestionPage /> : "Loading ...";

        return  (
            <div className="parent">
                <div className="navContainer">
                    <Nav />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {checkQuestionsArray}            
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    displayName: state.displayName,
    googleId: state.googleId,
    currentUser: state.currentUser,
    questions: state.questions
});

export default connect(mapStateToProps)(App);