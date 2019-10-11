import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import letter_logo from './images/letter_logo.png';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

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

    onSubmit = e => {
        e.preventDefault();
        const { first_name, last_name, email, password, password2, amount } = this.state;
        if (password !== password2) {
            // this.props.createMessage({ passwordNotMatch: 'Password do not match.' })
            alert('Password do not match.');
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
            <div id="page-wrapper">
                {/* <!-- Header --> */}
                <header id="header">
                    <h1 id="logo">
                        <a href="#" >
                            <img src={letter_logo} alt="" style={{ float: 'right', height: '40px', margin: '10px 0px' }} />
                        </a>
                    </h1>
                    <nav id="nav">
                        <ul>
                            <li>
                                <a href="#">About</a>
                                <ul>
                                    <li><a href="#story" className="scrolly">Our Story</a></li>
                                    <li><a href="#service" className="scrolly">Our Service</a></li>
                                    <li><a href="#industry" className="scrolly">The Industry</a></li>
                                    <li><a href="#why" className="scrolly">Why Us</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div style={{ width: '50%', margin: '0 auto', paddingTop: 60 }}>
                    <div className='card card-body mt-5'>
                        <h2 className='text-center' style={{ textAlign: 'center' }}>Register</h2>
                        <form onSubmit={this.onSubmit}>
                            {/* <div className='form-group'>
                                <label>Username</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='username'
                                    onChange={this.onChange}
                                    value={username}
                                />
                            </div> */}
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
                                <button type='submit' className="button primary">
                                    Next
                                </button>
                            </div>
                            <p style={{ marginTop: 10, textAlign: 'right' }}>
                                Already have an account? <Link to='/login'>Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}

export default Register
