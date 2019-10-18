import React, { Component } from 'react';
import { getRegisterUser } from '../../actions/auth';

export default class RegisteredUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerUserList: [],
        }
    }

    componentWillMount() {
        this.getRegisterUserList();
    }

    getRegisterUserList = () => {
        const response = getRegisterUser();
        response.then(result => {
            if (result.status === 200 && result.statusText === 'OK') {
                this.setState({ registerUserList: result.data });
            }
        })
    }

    render() {
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
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.amount}</td>
                                <td>{this.transformDateStr(user.date_joined)}</td>
                                {/* <td>{user.is_active ? 'True' : 'False'}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}