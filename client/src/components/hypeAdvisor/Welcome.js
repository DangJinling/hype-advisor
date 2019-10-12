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



    clickTab = (e) => {
        this.setState({ currentTab: e.target.name}, ()=>{
        });
        e.target.name === "Subscribed" ? this.getSubscribedUserList() : this.getRegisterUserList();
    }

    getRegisterUserList = () => {
        const response = getRegisterUser();
        response.then(result => {
            if( result.status === 200 && result.statusText === 'OK'){
                this.setState({ registerUserList: result.data });
            }
        })
    }

    getSubscribedUserList = () => {
        const response = getSubscribedUser();
        response.then(result => {
            if( result.status === 200 && result.statusText === 'OK'){
                this.setState({ subscribedUserList: result.data });
            }
        })
    }



    renderSubscribed =() => {
        const { subscribedUserList } = this.state;
        subscribedUserList.forEach(element => {
            console.log("=====");
        });
        
        return (
            <div style={{overflowX:'auto',padding:20}}>
                    <table id="flips_table" className="table"> 
                        <thead>
                            <tr>
                                <th>Name ↑↓</th>
                                <th>Quantity ↑↓</th>
                                <th>Buy Price (per item)</th>
                                <th>Buy Date</th>
                                <th>Sell Price (per item)</th>
                                <th>Sell Date</th>
                                <th>Time Held ↑↓</th>
                                <th>Fees</th>
                                <th>Gross Gain / Loss ↑↓</th>
                                <th>Net Gain / Loss ↑↓</th>
                                <th>Return on Investment (%) ↑↓</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Yeezy 350 v2 Glow</td>
                                <td>4</td>
                                <td>$470</td>
                                <td>5/25/19</td>
                                <td>$650</td>
                                <td>7/14/19</td>
                                <td>02 months</td>
                                <td>$208</td>
                                <td><font color="#11d128">$720</font></td>
                                <td><font color="#11d128">$512</font></td>
                                <td><font color="#11d128">27%</font></td>
                            </tr>
                            <tr>
                                <td>Travis Scott Air Jordan 4</td>
                                <td>5</td>
                                <td>$330</td>
                                <td>12/13/18</td>
                                <td>$528</td>
                                <td>7/14/19</td>
                                <td>07 months</td>
                                <td>$211</td>
                                <td><font color="#11d128">$990</font></td>
                                <td><font color="#11d128">$779</font></td>
                                <td><font color="#11d128">47%</font></td>
                            </tr>
                            
                        </tbody>
                    </table> 
                </div> 
        )
    }


    renderRegistered = () => {
        const { registerUserList } = this.state;
        registerUserList.forEach(element => {
            console.log("=====");
        });
        
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
        const { is_superuser, currentTab } = this.state;
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
                    is_superuser ? (
                        <div>
                            <section id="industry" className="wrapper style1 special fade" style={{paddingTop: 60}}>
                                <div className="container">
                                    <br />
                                    <a className="button"  onClick={this.clickTab} name='Subscribed'>Subscribed User</a>
                                    <a className="button" onClick={this.clickTab} name="Registered">Registered User</a>
                                    <div style={{paddingTop:20}}>
                                        {
                                            "Subscribed" === currentTab ? (
                                                this.renderSubscribed()
                                            ):(
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
}

export default Welcome
