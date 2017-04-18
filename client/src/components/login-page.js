import React from 'react';
import {Link} from 'react-router';


export default function LoginPage() {
    return <div className="LoginPage" >

    			<a className="loginBtn loginBtn--google aaa" href={'/api/auth/google'}>Login with Google</a>
    			</div>
}
