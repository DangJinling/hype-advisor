import React, { Component } from 'react'

import BasicLayout from './BasicLayout';


export default class MainLayout extends Component {
    render() {
        let { children } = this.props
        return (
            <BasicLayout>
              {children}
            </BasicLayout>
        )
    }
}

