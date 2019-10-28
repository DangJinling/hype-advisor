import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { getInvestment } from '../../actions/investment';
import { transformDateStr } from '../../common/util';

const columns = [
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Date',
        dataIndex: 'created_at',
        key: 'created_at',
        render: text => transformDateStr(text)
    },
    {
        title: 'Comments',
        key: 'comments',
        dataIndex: 'comments',
    },
];

export class Investment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            investmentList: [],
        }
    }

    componentWillMount() {
        this.getInvestmentList();
    }

    getInvestmentList = () => {
        const response = getInvestment();
        response.then(result => {
            if (result.status === 200 && result.statusText === 'OK') {
                this.setState({ investmentList: result.data });
            }
        })
    }

    render() {
        const { investmentList } = this.state;
        return (
            <div style={{ marginTop: 50 }}>
                <Table columns={columns} dataSource={investmentList} rowKey='id' />
            </div>

        );
    }
}

export default Investment
