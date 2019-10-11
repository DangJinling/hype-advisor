import React, { Component, Fragment } from 'react';
import { Card } from 'antd';
import RegisteredUsers from './RegisteredUsers';
import SubscribedUsers from './SubscribedUsers';

export default class UserTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: 'registeredUsers',
        }
        this.tabs = [
            { key: 'registeredUsers', tab: 'Registered Users' },
            { key: 'subscribedUsers', tab: 'Subscribed Users' },
        ];
        this.tabsContent = {
            registeredUsers: <RegisteredUsers />,
            subscribedUsers: <SubscribedUsers />,
        };
    }
    render() {
        const { key } = this.state;
        return (
            <Fragment>
                <Card
                    style={{ width: '100%' }}
                    tabList={this.tabs}
                    activeTabKey={key}
                    onTabChange={value => {
                        this.onTabChange(value, 'key');
                    }}
                    bordered={false}
                >
                    {this.tabsContent[key]}
                </Card>
            </Fragment>
        )
    }
}
