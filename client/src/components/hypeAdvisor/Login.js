import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../actions/auth';
import { Welcome } from './Welcome';
import letter_logo from './images/letter_logo.png';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

export class Login extends Component {
    state = {
        username: '',
        password: '',
        loginSuccess: false,
        user: null
    }

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        const body = JSON.stringify({ username, password });
        const response = login(body);
        console.log(response);
        response.then(result => {
            if (result.statusText === 'OK') {
                this.setState({ loginSuccess: true, user: result.data.user });
            }
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderLoginPage = () => {
        const { username, password } = this.state;
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
                < div className='col-md-6 m-auto' style={{ width: '50%', margin: '0 auto', paddingTop: 60 }
                }>
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
                                <button type='submit' className="button primary">
                                    Login
                                </button>
                            </div>
                            <p>
                                Don't have an account? <Link to='/register'>Regiser</Link>
                            </p>
                        </form>
                    </div>
                </div >
                <div style={{position:'absolute',bottom:0, marginLeft: -350, left:'50%'}}>
                    <footer style={{textAlign:'center', width:700}}>
                        <ul className="icons" style={{marginBottom:20}}>
                            <li><a href="http://instagram.com/thehypeadvisor" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                            <li><a href="mailto:team@thehypeadvisor.com" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
                        </ul>
                        <ul className="copyright">
                            <li>&copy; The Hype Advisor.</li><li>Built by: <a href="http://m1ch43lw4ng.com">Michael Wang</a></li><li>Last Updated: June 22nd, 2019</li>
                        </ul>
                    </footer>
                </div>
            </div>
        )
    }

    render() {
        const { loginSuccess, user } = this.state;
        return (
            loginSuccess ?
                <Welcome user={user} /> :
                this.renderLoginPage()
        )
    }
}

export default Login
