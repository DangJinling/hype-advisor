import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../actions/auth';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

export class Login extends Component {
    state = {
        username: '',
        password: '',
        loginSuccess: false,
    }

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        const body = JSON.stringify({ username, password });
        const response = login(body);
        console.log(response);
        response.then(result => {
            if (result.statusText === 'OK') {
                this.setState({ loginSuccess: true });
            }
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { loginSuccess } = this.state;
        if (loginSuccess) {
            return <Redirect to='/login' />;
        }
        const { username, password } = this.state;
        return (
            // <Form>
            //     <Form.Group controlId="formBasicEmail">
            //         <Form.Label>Email address</Form.Label>
            //         <Form.Control type="email" placeholder="Enter email" />
            //     </Form.Group>
            //     <Form.Group controlId="formBasicPassword">
            //         <Form.Label>Password</Form.Label>
            //         <Form.Control type="password" placeholder="Password" />
            //     </Form.Group>
            //     <Button variant="primary" type="submit" size="lg">
            //         Submit
            //     </Button>
            // </Form>
            <div className='col-md-6 m-auto'>
                <div className='card card-body mt-5'>
                    <h2 className='text-center'>Login</h2>
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
                        <div className='form-group'>
                            <button type='submit' className="button primary">
                                Login
                        </button>
                        </div>
                        <p>
                            Don't have an account? <Link to='/register'>Regiser</Link>
                        </p>
                    </form>
                </div>
            </div>

        )
    }
}

export default Login
