import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../actions/auth';
import { Welcome } from './Welcome';
import letter_logo from './images/letter_logo.png';
import $ from 'jquery';
// import './js/jquery.scrolly.min.js';
import './js/jquery.dropotron.min.js';
import './js/jquery.scrollex.min.js';
import browser from './js/browser.min.js';
import breakpoints from './js/breakpoints.min.js';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

export class Login extends Component {
    state = {
        username: '',
        password: '',
        loginSuccess: false,
        user: null,
    }

    componentDidMount() { }

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        const body = JSON.stringify({ username, password });
        const response = login(body);
        console.log(response);
        response.then(result => {
            if (result.statusText === 'OK') {
                localStorage.setItem('token', result.data.token);
                this.setState({ loginSuccess: true, user: result.data.user }, () => {
                    const { loginSuccess, user } = this.state;
                    if (loginSuccess) {
                        const data = { user };
                        const path = {
                            pathname: '/welcome',
                            state: data,
                        };
                        this.props.history.push(path);
                    }
                });
            }
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderLoginPage = () => {
        const { username, password } = this.state;
        return (
            < div className='col-md-6 m-auto' style={{ width: '50%', margin: '0 auto', paddingTop: 60 }}>
                <div className='card card-body mt-5'>
                    <h2 className='text-center' style={{ textAlign: 'center' }}>Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className='form-group'>
                            <label>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                name='username'
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                name='password'
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className='form-group' style={{ marginTop: 10 }}>
                            <button type='submit' className="button primary" id="LoginSubmit">
                                Login
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link to='/register'>Regiser</Link>
                        </p>
                    </form>
                </div>
            </div >
        )
    }


    render() {
        // const { loginSuccess, user } = this.state;
        return (
            this.renderLoginPage()
        )
    }
}

export default Login
