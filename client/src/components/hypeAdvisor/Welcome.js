import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import letter_logo from './images/letter_logo.png';
import RegisteredUsers from './RegisteredUsers';
import SubscribedUsers from './SubscribedUsers';


export class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            is_superuser: true,
            currentTab: "Subscribed",
            registerUserList: [],
            subscribedUserList: [],
        }
    }

    componentWillMount() {
    }



    clickTab = (e) => {
        this.setState({ currentTab: e.target.name }, () => {
        });
    }



    transformDateStr = (dateStr) => {
        const d = new Date(dateStr);
        const str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return str;
    }

    renderWelcome = () => {
        const { user } = this.state;
        return (
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

    render() {
        const { user, currentTab } = this.state;
        return (
            <div id="page-wrapper">
                {/* <!-- Header --> */}
                <header id="header">
                    <h1 id="logo">
                        <a href="#" >
                            <img src={letter_logo} alt="" id="logoImg" />
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
                            <li><Link to='/' className="button primary">Logout</Link></li>
                        </ul>
                    </nav>
                </header>
                {/* < div className='col-md-6 m-auto' style={{ width: '50%', margin: '0 auto', paddingTop: 60 }}> */}
                <div className='card card-body mt-5'>
                    {
                        user.is_superuser ? (
                            <div>
                                <section id="industry" className="wrapper style1 special fade" style={{ paddingTop: 60 }}>
                                    <div className="container">
                                        <br />
                                        <a className="button" onClick={this.clickTab} name='Subscribed'>Subscribed User</a>
                                        <a className="button" onClick={this.clickTab} name="Registered">Registered User</a>
                                        <div style={{ paddingTop: 20 }}>
                                            {
                                                "Subscribed" === currentTab ? (
                                                    < RegisteredUsers />
                                                ) : (
                                                        <SubscribedUsers />
                                                    )
                                            }
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )
                            :
                            this.renderWelcome()
                    }
                </div>
                {/* </div > */}
                <footer style={{ textAlign: 'center' }}>
                    <ul className="icons" style={{ marginBottom: 20 }}>
                        <li><a href="http://instagram.com/thehypeadvisor" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                        <li><a href="mailto:team@thehypeadvisor.com" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
                    </ul>
                    <ul className="copyright">
                        <li>&copy; The Hype Advisor.</li><li>Built by: <a href="http://m1ch43lw4ng.com">Michael Wang</a></li><li>Last Updated: June 22nd, 2019</li>
                    </ul>
                </footer>
            </div>
        )
    }
}

export default Welcome
