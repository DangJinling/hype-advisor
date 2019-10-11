import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PDF from 'react-pdf-js';
import { register } from '../../actions/auth';
import pdfFile from '../../asset/Terms and Conditions.pdf';
import './Agreement.css';

export class Agreement extends Component {
    state = {
        numPages: null,
        loaded: false,
        currentPage: 1,
        agreeMentRaion: "agree",
        RedirectStatus: false,
        RedirectPath: null,
    }

    onDocumentComplete = numPages => {
        this.setState({ numPages, loaded: numPages ? true:false });
    };

    onSubmit = e => {
        e.preventDefault();
        // this.props.location.state.data
        const { agreeMentRaion } = this.state;
        if("agree" === agreeMentRaion){
            const data = this.props.location.state.data;
            const dataObj = JSON.parse(data);
            if(dataObj.first_name && dataObj.last_name && dataObj.password && dataObj.email && dataObj.amount){
                const response = register(data);
                response.then(result => {
                    if (result.statusText === 'OK') {
                        this.setState({ registerSuccess: true });
                    }
                })
            }else{
                this.setState({ RedirectStatus: true, RedirectPath: "register"});
            }
            
        }else if("deny" === agreeMentRaion){
            this.setState({ RedirectStatus: true, RedirectPath: "#"});
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onRadioChange = e => {
        console.log("----")
    }

    setPage = (page) => {
        const { numPages } = this.state;
        let currentPage = page;
        if(page > numPages && page < 0 ){
            currentPage = 1;
        }
        this.setState({ currentPage})
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
                    { page !== 1 && previousButton}
                    { page != pages && nextButton}
                </ul>
            </div>
        );
    }

    renderForm = () => {
        const { agreeMentRaion } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div style={{marginTop:20}}>
                    <label><input name="agreeMentRaion" type="radio" value="agree" onClick={this.onChange} checked={agreeMentRaion === 'agree'}/>Agree</label>
                    <label><input name="agreeMentRaion" type="radio" value="deny" onClick={this.onChange} checked={agreeMentRaion === 'deny'}/>Deny</label>
                    <div style={{float:'right'}}>
                        <button type='submit' className="button primary">Submit</button>
                    </div>
                </div>
            </form>
        )
    }

  


    render() {
        const { currentPage, loaded, numPages, RedirectStatus, RedirectPath }  = this.state;
        if (RedirectStatus && RedirectPath) {
            const path = `/${RedirectPath}`;
            return <Redirect to={path} />;
        }
        return (
            <div style={{width:612, margin: '20px auto'}}>
                {!loaded ? 
                    <span>loading...</span>
                    :
                    null
                }
                <div style={{ overflowY:'auto', overflowX:"hidden", height:580}}>
                    <PDF file={pdfFile} onDocumentComplete={this.onDocumentComplete} page={currentPage} />
                </div>
                {numPages > 1 && this.renderPagination(currentPage, numPages)}
                {numPages && this.renderForm()}
            </div>
        )
    }
}

export default Agreement
