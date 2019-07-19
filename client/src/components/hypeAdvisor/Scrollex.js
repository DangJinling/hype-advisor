import React, { Component } from 'react';
import letter_logo from './images/letter_logo.png';
import new_logo_no_border from './images/new_logo_no_border.png';
import service from './images/service.png';
import './main.css';
// import './font-awesome.min.css';
import './noscript.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMember } from '../../actions/members';
import { Link } from 'react-router-dom';


export class Scrollex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, email } = this.state;
        const member = { name, email };
        const res = addMember(member);
        console.log(res);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { name, email } = this.state;
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
                            <li><a href="#form" className="scrolly">Contact</a></li>
                            <li><Link to='/login'>Log In</Link></li>
                            <li><Link to='/register' className="button primary">Sign Up</Link></li>

                        </ul>
                    </nav>
                </header>
                {/* <!-- Banner --> */}
                <section id="banner">
                    <div className="content">
                        <header>
                            <h2>
                                Turn your passion to profit,<br /> without all of the work.<br /></h2>
                            <p>
                                Join The Hype Fund by The Hype Advisor<br />
                            </p>
                        </header>
                        <span className="image">
                            <img src={new_logo_no_border} alt="" />
                        </span>
                    </div>
                    <a href="#story" className="goto-next scrolly">Next</a>
                </section>
                {/* // <!-- Body --> */}
                <section id="story" className="spotlight style1 right">
                    {/* <span className="image fit main"><img src={travis_af1} alt="" /></span> */}
                    <div className="content">
                        <div className="col-4 col-12-medium">
                            <header>
                                <h2>Our Story</h2>
                                <p>Who is "The Hype Advisor?"</p>
                            </header>
                        </div>
                        <div className="col-4 col-12-medium">
                            <p>
                                We are a team of streetwear enthusiasts who have been passionate about the world of hype for as long as we can remember. However, streetwear is an expensive hobby: <b>We needed a way to fund our passion.</b>
                                <br />
                                <br />
                                Then, about five years ago, we discovered reselling. By buying certain items for the low, waiting for a calculated period of time, and selling them high, we were able to profit.
						</p>
                        </div>
                    </div >
                    <a href="#two" className="goto-next scrolly">Next</a>
                </section >
                <section id="two" className="spotlight style1 left">
                    {/* <span className="image fit main"><img src={bape} alt="" /></span> */}
                    <div className="content">
                        <div className="col-4 col-12-medium">
                            <header>
                                <h2>The Hype Fund</h2>
                                <p>Our expertise, now in your hands.</p>
                            </header>
                            <p>
                                Five years later, here we are. Reselling allows us to make more money than we could have ever imagined. With our knowledge navigating the streetwear market, we accurately predict and obtain the items that are going to appreciate.
							<br />
                                <br />
                                <b>We want to bring our experience to you.</b> We know that getting into reselling is very difficult, and the steep learning curve has driven many people away. Therefore, we want to offer a service that does it for you. Introducing <b><i>The Hype Fund</i></b> by <b><i>The Hype Advisor</i></b>.
						</p>
                        </div>
                    </div >
                    <a href="#service" className="goto-next scrolly">Next</a>
                </section >
                <section id="service" className="wrapper style2 special fade">
                    <div className="container">
                        <header>
                            <h2>Our Service</h2>
                            <p>A clothing and sneaker-based hedgefund with no barriers to entry.</p>
                        </header>
                        <p align="left">
                            We are a <b>niche hedge fund</b> that operates specifically in the streetwear market. Using our experience, connections, and data, we buy items that we predict to be <b>bullish</b>: they increase in resale value over time. If you invest into us, we’ll put your capital into the market, buying and selling streetwear items to make a profit. At the end of the investing time frame, we transfer the money we make directly to your <b>PayPal account</b>, minus a commission fee.
					</p>
                        <div className="box alt">
                            <div className="row gtr-50 gtr-uniform">
                                <div className="col-12"><span className="image fit"><img src={service} alt="" /></span></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="industry" className="wrapper style1 special fade">
                    <div className="container">
                        <header>
                            <h2>The Industry</h2>
                            <p>The potential in streetwear investment.</p>
                        </header>
                        <p align="left">
                            <span id="chart" className="left"></span>
                            The streetwear industry is a multi-billion industry, with the resell market itself currently valued at <b>$2 billion</b> (per <a href="https://www.businessinsider.com/most-expensive-sneakers-sold-last-year-resale-2019-4" target="_blank">Business Insider)</a>. This number is only growing at an exponential rate: it is projected to hit <b>$6 billion by 2025</b>. <b>Start investing now, you won’t regret it</b>.
						<br />
                            <br />
                            For a glimpse at <b>our profits</b> or <b>the growth of the market and comparisons to the stock market</b>, click the buttons below.
						<br />
                            <a className="button">Our Track Record</a>
                            <a className="button">Market Comparisons</a>
                            <br />
                            <br />
                            Ultimately, the streetwear market is < b > more predictable, less volatile</b >, and thus has a < b > greater potential</b > for profit than other open markets.
					</p >
                        <br />
                    </div >
                </section >
                <section id="why" className="wrapper style2 special fade">
                    <div className="container">
                        <header>
                            <h2>Why Believe In Us?</h2>
                            <p>No risk. Better profits.</p>
                        </header>
                        <p align="left">
                            The streetwear market is unlike any other. Not only is there a constant influx of new drops every week, but there is also a constant demand for valued items. These items we choose tend to rise in resale price quickly, but rarely drop below its original value, making them low-risk investments.
						<br />
                            <br />
                            Like in any global market, we use our knowledge, experience, and connections to buy and sell these assets, some of which are very difficult to obtain. We want to show you that streetwear is not just a passion for streetwear enthusiasts, but is also a living, breathing market where millions of dollars have the potential to be made!
						<br />
                            <br />
                            If you want to test out how we do in the market, it’s okay to start small! Our business is structured so each client can contribute, <b>with just a minimum amount of $100.</b>
                        </p >
                    </div>
                </section >
                <section id="five" className="wrapper style1 special fade-up">
                    <div className="container">
                        <header className="major">
                            <h2>5+ Years of Reselling Success</h2>
                            <p>Your funds in the hands of experts with a <b>proven track record</b>. Best part is, you get to learn ins and outs of the streetwear market with us. We promise the following and look forward to being at your service.</p>
                        </header>
                        <div className="box alt">
                            <div className="row gtr-uniform">
                                <section className="col-4 col-6-medium col-12-xsmall">
                                    <span className="icon alt major fa-shield"></span>
                                    <h3>Security</h3>
                                    <p>We keep all your data safe and secure, and you decide who does or doesn’t see your portfolio. Your information will never be shown to any third parties.</p>
                                </section>
                                <section className="col-4 col-6-medium col-12-xsmall">
                                    <span className="icon alt major fa-eye"></span>
                                    <h3>Transparency</h3>
                                    <p>We are 100% transparent with our buying and selling. We even encourage our clients to examine the transactions to enrich themselves in the culture and the intricacies of the resell world.</p>
                                </section>
                                <section className="col-4 col-6-medium col-12-xsmall">
                                    <span className="icon alt major fa-desktop"></span>
                                    <h3>Accessibility</h3>
                                    <p>Our interface is simple and easy to understand. All of the information that you need will be right at your fingertips.</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="form" className="wrapper style2 special fade">
                    <div className="container">
                        <header>
                            <h2>Interested In Our Service?</h2>
                            <div>
                                Leave us your information below and hit <b>Join Us</b> to join our weekly newsletter and follow our investments and the reselling culture. If you have specific interests, hit the <b>Contact Us</b> button to send us an email.
						</div>
                            <br />
                            <form onSubmit={this.onSubmit}>
                                <div className="row gtr-uniform gtr-50">
                                    <div className="col-3 col-12-xsmall">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={name}
                                            placeholder="Name (First Last)"
                                            required={true}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-6 col-12-xsmall">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            placeholder="Email (name@website.com)"
                                            required={true}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-3 col-12-xsmall">
                                        <ul className="actions">
                                            <li><a href="mailto:team@thehypeadvisor.com" className="button">Contact Us</a></li>
                                            <li><input type="submit" value="Join Us" className="primary" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </header>
                        <form method="post" action="#" className="cta">
                            <div className="row gtr-uniform gtr-50">
                            </div>
                        </form>
                    </div>
                </section>
                {/* <!-- Footer --> */}
                <footer id="footer">
                    <ul className="icons">
                        <li><a href="http://instagram.com/thehypeadvisor" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                        <li><a href="mailto:team@thehypeadvisor.com" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
                    </ul>
                    <ul className="copyright">
                        <li>&copy; The Hype Advisor.</li><li>Built by: <a href="http://m1ch43lw4ng.com">Michael Wang</a></li><li>Last Updated: June 22nd, 2019</li>
                    </ul>
                </footer>
            </div >
        )
    }
}

export default Scrollex
