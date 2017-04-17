import React from 'react';
import * as Cookies from 'js-cookie';

import QuestionPage from './question-page';
import LoginPage from './login-page';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        const displayName = Cookies.get('displayName');
       
    }
    render() {
        if (!this.state.currentUser) {
            return <LoginPage />;
        }

        return (
           <div>
           <h1> Welcome {this.state.displayName} </h1>
            <QuestionPage />;
            </div>

        )
    }
}

export default App;