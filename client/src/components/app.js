import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';

import QuestionPage from './question-page';
import LoginPage from './login-page';
import {matchGoogleToken} from '../actions/action';

class App extends React.Component {
    constructor(props) {
        super(props);  
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.props.dispatch(matchGoogleToken(accessToken));
        }
    }

    render() {
        if (!this.props.currentUser) {
            return <LoginPage />;
        }
        return <QuestionPage />;
    }
}

const mapStateToProps = (state) => ({
displayName: state.displayName,
googleId: state.googleId,
currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);




