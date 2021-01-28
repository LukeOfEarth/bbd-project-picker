import React, { Component } from 'react'
import '../styles/login.css'
import { FaMicrosoft, FaGooglePlus, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

class Login extends Component {
    render() {
        return (

            <div className="container">
                <div className="logreg-forms">

                    <form className="form-signin">
                        <h1 className="h3 mb-3" style={{ textAlign: 'center', fontWeight: 'normal' }} > Sign in</h1>
                        <div className="social-login">
                            <button className="btn google-btn social-btn" type="button"><span><FaGooglePlus className='icon'></FaGooglePlus> Sign in with Google+</span> </button>
                            <button className="btn microsoft-btn social-btn" type="button"><span><FaMicrosoft className='icon'></FaMicrosoft> Sign in with Microsoft</span> </button>
                        </div>
                        <p style={{ textAlign: 'center' }} > OR </p>
                        <input type="email" id="email" className="form-control" placeholder="Email address" required="" autofocus="" />
                        <input type="password" id="password" className="form-control" placeholder="Password" required="" />

                        <button className="btn btn-primary btn-block" type="button" onClick={this.connect}><FaSignInAlt className='icon'></FaSignInAlt> Sign in</button>
                        <a href="#" id="forgot_pswd">Forgot password?</a>
                        <hr />
                        <p>Don't have an account!</p>
                        <button className="btn btn-primary btn-block" type="button" id="btn-signup"><FaUserPlus className='icon'></FaUserPlus> Sign up New Account</button>
                    </form>

                </div >
            </div>
        )
    }
}

export default Login;