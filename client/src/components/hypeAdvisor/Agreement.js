import React, { Component } from 'react';
import { Modal } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import PDF from 'react-pdf-js';
import { register } from '../../actions/auth';
import pdfFile from '../../asset/Terms and Conditions.pdf';
import './Agreement.css';
import letter_logo from './images/letter_logo.png';

export class Agreement extends Component {
    state = {
        numPages: null,
        loaded: false,
        currentPage: 1,
        agreeMentRaion: "agree",
        RedirectStatus: false,
        RedirectPath: null,
        visible: false,
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            RedirectStatus: true,
            RedirectPath: "#"
        });
    };

    onDocumentComplete = numPages => {
        this.setState({ numPages, loaded: numPages ? true : false });
    };

    onSubmit = e => {
        e.preventDefault();
        // this.props.location.state.data
        const { agreeMentRaion } = this.state;
        if ("agree" === agreeMentRaion) {
            const data = this.props.location.state.data;
            const dataObj = JSON.parse(data);
            if (dataObj.first_name && dataObj.last_name && dataObj.password && dataObj.email && dataObj.amount) {
                const response = register(data);
                response.then(result => {
                    if (result.statusText === 'OK') {
                        // this.setState({ registerSuccess: true });
                        // this.showModal();
                        alert('Thank for singing up. Please check your email to active the account.');
                        this.setState({
                            visible: false,
                            RedirectStatus: true,
                            RedirectPath: "#"
                        });
                    }
                })
            } else {
                this.setState({ RedirectStatus: true, RedirectPath: "register" });
            }
        } else if ("deny" === agreeMentRaion) {
            this.setState({ RedirectStatus: true, RedirectPath: "#" });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onRadioChange = e => {
        console.log("----")
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    setPage = (page) => {
        const { numPages } = this.state;
        let currentPage = page;
        if (page > numPages && page < 0) {
            currentPage = 1;
        }
        this.setState({ currentPage })
    }

    renderPagination = (page, pages) => {
        if (!pages && pages === 1) {
            return null;
        }
        let previousButton = (
            <li className="previous" onClick={() => this.setPage(page - 1)}>
                <a href="javascript:;"><i className="fa fa-arrow-left"></i> Previous</a>
            </li>
        );
        let nextButton = (
            <li className="next" onClick={() => this.setPage(page + 1)}>
                <a href="javascript:;">Next <i className="fa fa-arrow-right"></i></a>
            </li>
        );
        return (
            <div className="PaginationFooter">
                <ul className="pager">
                    {page !== 1 && previousButton}
                    {page != pages && nextButton}
                </ul>
            </div>
        );
    }

    renderForm = () => {
        const { agreeMentRaion } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div style={{ marginTop: 20 }}>
                    <label><input name="agreeMentRaion" type="radio" value="agree" onClick={this.onChange} checked={agreeMentRaion === 'agree'} />Agree</label>
                    <label><input name="agreeMentRaion" type="radio" value="deny" onClick={this.onChange} checked={agreeMentRaion === 'deny'} />Deny</label>
                    <div style={{ float: 'right' }}>
                        <button type='submit' className="button primary">Submit</button>
                    </div>
                </div>
            </form>
        )
    }




    render() {
        const { currentPage, loaded, numPages, RedirectStatus, RedirectPath, visible } = this.state;
        if (RedirectStatus && RedirectPath) {
            const path = `/${RedirectPath}`;
            return <Redirect to={path} />;
        }
        return (
            <div id="page-wrapper">
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
                <div style={{ width: 612, margin: '20px auto' }}>
                    {!loaded ?
                        <span>loading...</span>
                        :
                        null
                    }
                    <div style={{ overflowY: 'auto', overflowX: "hidden", height: 580 }}>
                        <PDF file={pdfFile} onDocumentComplete={this.onDocumentComplete} page={currentPage} />
                    </div>
                    {numPages > 1 && this.renderPagination(currentPage, numPages)}
                    {numPages && this.renderForm()}
                    {/* <Modal
                        // centered
                        style={{ top: 10 }}
                        title="Register result"
                        visible={visible}
                        onOk={this.handleOk}
                        zIndex={999}
                    >
                        <p>Thank for singing up.</p>
                    </Modal> */}
                </div>
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

export default Agreement
