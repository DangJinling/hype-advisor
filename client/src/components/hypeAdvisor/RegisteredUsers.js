import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRegisterUser, deleteUser } from '../../actions/auth';
import { getInvestmentByUser } from '../../actions/investment';
import { transformDateStr } from '../../common/util';
import './ant-global.css'


export class RegisteredUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerUserList: [],
            investmentList: [],
        };
        this.columns = [
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'First name',
                dataIndex: 'first_name',
                key: 'first_name',
            },
            {
                title: 'Last name',
                dataIndex: 'last_name',
                key: 'last_name',
            },
            {
                title: 'Modified date',
                dataIndex: 'date_joined',
                key: 'date_joined',
                render: text => transformDateStr(text)
            },
        ];

        this.investmentColumns = [
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
    }

    static propTypes = {
        getRegisterUser: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        getInvestmentByUser: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.getRegisterUserList();
    }

    getRegisterUserList = () => {
        const response = this.props.getRegisterUser();
        response.then(result => {
            if (result.status === 200 && result.statusText === 'OK') {
                this.setState({ registerUserList: result.data });
            }
        })
    }

    loadInvestmentByUser = (record) => {
        const response = getInvestmentByUser(record);
        response.then(result => {
            if (result.status === 200 && result.statusText === 'OK') {
                this.setState({ investmentList: result.data.investment });
            }
        })
    }

    render() {
        const { registerUserList, investmentList } = this.state;

        return (
            <div>
                <Table dataSource={registerUserList} columns={this.columns} rowKey='id' onRow={record => {
                    return {
                        onClick: () => { this.loadInvestmentByUser(record) }, // 点击行
                    };
                }}
                    pagination = {{
                        defaultPageSize: 2
                    }}
                />
                < Divider />
                <Table dataSource={investmentList} columns={this.investmentColumns} rowKey='id' />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // leads: state.leads.leads
})

export default connect(mapStateToProps, { getRegisterUser, deleteUser, getInvestmentByUser })(RegisteredUsers);