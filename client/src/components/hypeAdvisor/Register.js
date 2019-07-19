import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

export class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        registerSuccess: false,
    }

    onSubmit = e => {
        e.preventDefault();
        const { first_name, last_name, email, password, password2 } = this.state;
        if (password !== password2) {
            this.props.createMessage({ passwordNotMatch: 'Password do not match.' })
        } else {
            const newUser = {
                first_name,
                last_name,
                password,
                email
            }
            const body = JSON.stringify(newUser);
            const response = register(body);
            response.then(result => {
                if (result.statusText === 'OK') {
                    this.setState({ registerSuccess: true });
                }
            })
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
        const { username, first_name, last_name, email, password, password2 } = this.state;
        return (
            <div className='col-md-6 m-auto'>
                <div className='card card-body mt-5'>
                    <h2 className='text-center'>Regiser</h2>
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
                        <div className='form-group'>
                            <label>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                name='email'
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className='form-group'>
                            <label>First Name</label>
                            <input
                                type='text'
                                className='form-control'
                                name='first_name'
                                onChange={this.onChange}
                                value={first_name}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Last Name</label>
                            <input
                                type='text'
                                className='form-control'
                                name='last_name'
                                onChange={this.onChange}
                                value={last_name}
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
                        <div className='form-group'>
                            <label>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control'
                                name='password2'
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className="button primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to='/login'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>

        )
    }
}

export default Register
