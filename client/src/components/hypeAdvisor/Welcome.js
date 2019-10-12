import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRegisterUser, getSubscribedUser } from '../../actions/auth';
import letter_logo from './images/letter_logo.png';


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
        this.getSubscribedUserList();
    }



    clickTab = (e) => {
        this.setState({ currentTab: e.target.name }, () => {
        });
        e.target.name === "Subscribed" ? this.getSubscribedUserList() : this.getRegisterUserList();
    }

    getRegisterUserList = () => {
        const response = getRegisterUser();
        response.then(result => {
            if (result.status === 200 && result.statusText === 'OK') {
                this.setState({ registerUserList: result.data });
            }
        })
    }

    getSubscribedUserList = () => {
        const response = getSubscribedUser();
        response.then(result => {
            if (result.status === 200 && result.statusText === 'OK') {
                this.setState({ subscribedUserList: result.data });
            }
        })
    }



    renderSubscribed = () => {
        const { subscribedUserList } = this.state;
        return (
            <div style={{ overflowX: 'auto', padding: 20 }}>
                <table id="flips_table" className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Joined date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribedUserList.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }


    renderRegistered = () => {
        const { registerUserList } = this.state;

        return (
            <div style={{ overflowX: 'auto', padding: 20 }}>
                <table id="flips_table" className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Amount</th>
                            <th>Modified date</th>
                            {/* <th>Is active</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {registerUserList.map(user => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.amount}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.date_joined}</td>
                                {/* <td>{user.is_active ? 'True' : 'False'}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
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
                            <section id="industry" className="wrapper style1 special fade" style={{ paddingTop: 60 }}>
                                <div className="container">
                                    <br />
                                    <a className="button" onClick={this.clickTab} name='Subscribed'>Subscribed User</a>
                                    <a className="button" onClick={this.clickTab} name="Registered">Registered User</a>
                                    <div style={{ paddingTop: 20 }}>
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
                    )
                        :
                        this.renderWelcome()
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
