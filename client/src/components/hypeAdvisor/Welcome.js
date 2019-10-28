import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import letter_logo from './images/letter_logo.png';
import { Tabs } from 'antd';
import RegisteredUsers from './RegisteredUsers';
import SubscribedUsers from './SubscribedUsers';
import { Investment } from '../investment/Investment';

const { TabPane } = Tabs;
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

    render() {
        const { user, currentTab } = this.state;
        return (
            user.is_superuser ? (
                // <div>
                //     <section id="industry" className="wrapper style1 special fade" style={{ paddingTop: 60 }}>
                //         <div className="container">
                //             <br />
                //             <a className="button" onClick={this.clickTab} name='Subscribed'>Subscribed User</a>
                //             <a className="button" onClick={this.clickTab} name="Registered">Registered User</a>
                //             <div style={{ paddingTop: 20 }}>
                //                 {
                //                     "Subscribed" === currentTab ? (
                //                         <SubscribedUsers />
                //                     ) : (
                //                             < RegisteredUsers />
                //                         )
                //                 }
                //             </div>
                //         </div>
                //     </section>
                // </div>
                < div className='col-md-24 m-auto' style={{ width: '50%', margin: '0 auto', paddingTop: 60 }}>
                    <div className='card card-body mt-5'>
                        <Tabs defaultActiveKey="1" style={{color:'#fff'}}>
                            <TabPane tab="Subscribed User" key="1" >
                                <SubscribedUsers />
                            </TabPane>
                            <TabPane tab="Registered User" key="2">
                                < RegisteredUsers />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            )
                :
                <Investment />
        )
    }
}

export default Welcome
