import React, { Component } from 'react';
import { Form, Select, Input, Button, message } from 'antd';
import { getEmailConfig, addEmailConfig, updateEmailConfig } from '../../actions/settings';

const { Option } = Select;

export class Settings extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getEmailConfig();
    }

    getEmailConfig = () => {
        const response = getEmailConfig();
        response.then(result => {
            if (result.status === 200 && result.statusText === 'OK') {
                const { form } = this.props;
                if (result.data.length > 0) {
                    console.log(result.data[0]);
                    const { id, email_host, email_user, email_pwd } = result.data[0];
                    form.resetFields();
                    form.setFieldsValue({
                        id, email_host, email_user, email_pwd
                    });
                }
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.email_pwd !== values.email_confirm_pwd) {
                    message.error("Password does not match.");
                } else {
                    console.log('Received values of form: ', values);
                    delete values.email_confirm_pwd;
                    let response;
                    if (values.id) {
                        response = updateEmailConfig(values);
                    } else {
                        response = addEmailConfig(values);
                    }
                    response.then(result => {
                        if (result.status === 200 && result.statusText === 'OK') {
                            message.success("Email has been saved succeessed.")
                        }
                    })
                }
            }
        });
    };

    handleSelectChange = value => {
        console.log(value);
        this.props.form.setFieldsValue({
            email_host: value,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item >
                    {getFieldDecorator('id')(<Input type="hidden" />)}
                </Form.Item>
                <Form.Item label="Emaill type">
                    {getFieldDecorator('email_host', {
                        rules: [{ required: true, message: 'Please select the mail type!' }],
                    })(
                        <Select
                            placeholder="Select a mail type"
                            onChange={value => this.handleSelectChange(value)}
                        >
                            <Option value="smtp.gmail.com">Gmail</Option>
                            <Option value="smtp-mail.outlook.com">Outlook</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="Emaill Host">
                    {getFieldDecorator('email_host')(<Input type="text" disabled />)}
                </Form.Item>
                <Form.Item label="Email account">
                    {getFieldDecorator('email_user', {
                        rules: [{ required: true, message: 'Please input your email account!' }],
                    })(<Input type="email" placeholder='Email' />)}
                </Form.Item>
                <Form.Item label="Password">
                    {getFieldDecorator('email_pwd', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Confirm password">
                    {getFieldDecorator('email_confirm_pwd', {
                        rules: [{ required: true, message: 'Please input your confirm password!' }],
                    })(
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(Settings);
