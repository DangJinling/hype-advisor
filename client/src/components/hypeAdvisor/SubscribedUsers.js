import React, { Component } from 'react';
import { Table } from 'antd';
import { getSubscribedUser } from '../../actions/subscribedUsers';
import { transformDateStr } from '../../common/util';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Joined date',
        dataIndex: 'created_at',
        key: 'created_at',
        render: text => transformDateStr(text)
    },
];
export default class SubscribedUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribedUserList: [],
        }
    }

    componentWillMount() {
        this.getSubscribedUserList();
    }

    getSubscribedUserList = () => {
        const response = getSubscribedUser();
        response.then(result => {
            if (result.status === 200 && result.statusText === 'OK') {
                this.setState({ subscribedUserList: result.data });
            }
        })
    }

    transformDateStr = (dateStr) => {
        const d = new Date(dateStr);
        const str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return str;
    }

    render() {
        const { subscribedUserList } = this.state;
        return (
            <Table dataSource={subscribedUserList} columns={columns} rowKey='id' />
        )
    }
}