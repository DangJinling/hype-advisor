import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import letter_logo from './images/letter_logo.png';
import Alert from "../layout/alert/alert.jsx";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import $ from 'jquery';
// import './js/jquery.scrolly.min.js';
import './js/jquery.dropotron.min.js';
import './js/jquery.scrollex.min.js';
import browser from './js/browser.min.js';
import breakpoints from './js/breakpoints.min.js';

export class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        amount: '',
        registerSuccess: false,
    }

    componentDidMount() {}

    onSubmit = e => {
        e.preventDefault();
        const { first_name, last_name, email, password, password2, amount } = this.state;
        if (password !== password2) {
            Alert.open({
                alertTip: "Password does not match.",
                closeAlert: function () {
                    console.log("clsose alert...");
                }
            });
        } else {
            if (email && amount !== '' && first_name && last_name) {
                const newUser = {
                    first_name,
                    last_name,
                    password,
                    email,
                    amount
                }
                this.props.history.push({ pathname: '/agreement', state: { data: JSON.stringify(newUser) } })
            }
        }
    }


    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { registerSuccess } = this.state;
        if (registerSuccess) {
            return <Redirect to='/login' />;
        }
        const { first_name, last_name, email, password, password2, amount } = this.state;
        return (
            < div className='col-md-6 m-auto' style={{ width: '50%', margin: '0 auto', paddingTop: 60 }}>
                    <div className='card card-body mt-5'>
                        <h2 className='text-center' style={{ textAlign: 'center' }}>Register</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className='col-6 col-12-xsmall' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                <label>Email</label>
                                <input
                                    type='email'
                                    // className='form-control'
                                    name='email'
                                    onChange={this.onChange}
                                    value={email}
                                />
                            </div>
                            <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                <label>First Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='first_name'
                                    onChange={this.onChange}
                                    value={first_name}
                                />
                            </div>
                            <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                <label>Last Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='last_name'
                                    onChange={this.onChange}
                                    value={last_name}
                                />
                            </div>
                            <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                <label>Amount</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='amount'
                                    onChange={this.onChange}
                                    value={amount}
                                />
                            </div>
                            <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                <label>Password</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    name='password'
                                    onChange={this.onChange}
                                    value={password}
                                />
                            </div>
                            <div className='form-group' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                <label>Confirm Password</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    name='password2'
                                    onChange={this.onChange}
                                    value={password2}
                                />
                            </div>
                            <div className='form-group' style={{ marginTop: 10, textAlign: 'right' }}>
                                {/* <Link to='/agreement' >
                                    <button type='button' className="button primary">Next</button>
                                </Link> */}
                                <button type='submit' className="button primary" id="registerSubmit">
                                    Next
                                </button>
                            </div>
                            <p style={{ marginTop: 10, textAlign: 'right' }}>
                                Already have an account? <Link to='/login'>Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
        )
    }
}

export default Register
