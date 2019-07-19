import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import letter_logo from './images/letter_logo.png';

export class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
        }
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                <header id="header">
                    <h1 id="logo">
                        <a href="#" >
                            <img src={letter_logo} alt="" style={{ float: 'right', height: '40px', margin: '10px 0px' }} />
                        </a>
                    </h1>
                    <nav id="nav">
                        <ul>
                            <li><Link to='/' className="button primary">Logout</Link></li>
                        </ul>
                    </nav>
                </header>
                <div style={{ width: '100%', height: '450px', position: 'relative' }}>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        marginTop: '-100px',
                        marginLeft: '-750px',
                        width: "100%",
                        height: "200px",
                    }}>
                        <p style={{ textAlign: 'center' }}>Welcome <h2>{user.username}</h2> </p>
                    </div>
                </div>
            </div>

        )
    }
}

export default Welcome
