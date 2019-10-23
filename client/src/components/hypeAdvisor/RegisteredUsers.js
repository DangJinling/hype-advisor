import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRegisterUser, deleteUser } from '../../actions/auth';


export class RegisteredUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerUserList: [],
        }
    }

    static propTypes = {
        getRegisterUser: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
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

    transformDateStr = (dateStr) => {
        const d = new Date(dateStr);
        const str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return str;
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
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={this.props.deleteUser.bind(this, user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // leads: state.leads.leads
})

export default connect(mapStateToProps, { getRegisterUser, deleteUser })(RegisteredUsers);