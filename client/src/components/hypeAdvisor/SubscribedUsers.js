import React, { Component } from 'react';
import { getSubscribedUser } from '../../actions/subscribedUsers';


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
            <div style={{ overflowX: 'auto', padding: 20 }}>
                <table id="flips_table" className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Joined date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribedUserList.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{this.transformDateStr(user.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}