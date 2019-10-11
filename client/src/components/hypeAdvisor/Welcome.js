import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import letter_logo from './images/letter_logo.png';

export class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            currentTab: "Subscribed"
        }
    }

    clickTab = (e) => {
        this.setState({ currentTab: e.target.name }, () => {

        });

    }



    renderSubscribed = () => {
        return (
            <div style={{ width: '100%', height: '450px', position: 'relative' }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    marginTop: '-100px',
                    marginLeft: '-750px',
                    width: "100%",
                    height: "200px",
                }}>
                    <p style={{ textAlign: 'center' }}><h2>Subscribed User List</h2> </p>
                </div>
            </div>
        )
    }


    renderRegistered = () => {
        return (
            <div style={{ width: '100%', height: '450px', position: 'relative' }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    marginTop: '-100px',
                    marginLeft: '-750px',
                    width: "100%",
                    height: "200px",
                }}>
                    <p style={{ textAlign: 'center' }}><h2>Registered User List</h2> </p>
                </div>
            </div>
        );
    }



    render() {
        const { user, currentTab } = this.state;
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
                {
                    user.is_superuser ? (
                        <div>
                            <section id="industry" className="wrapper style1 special fade">
                                <div className="container">
                                    <br />
                                    <a className="button" onClick={this.clickTab} name='Subscribed'>Subscribed User</a>
                                    <a className="button" onClick={this.clickTab} name="Registered">Registered User</a>
                                    <div>
                                        {
                                            "Subscribed" === currentTab ? (
                                                this.renderSubscribed()
                                            ) : (
                                                    this.renderRegistered()
                                                )
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
                    ) : (
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
                        )
                }

                <div style={{ position: 'absolute', bottom: 0, marginLeft: -350, left: '50%' }}>
                    <footer style={{ textAlign: 'center', width: 700 }}>
                        <ul className="icons" style={{ marginBottom: 20 }}>
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
}

export default Welcome
