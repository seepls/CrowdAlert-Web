import React, { Component } from 'react';
import { Responsive } from 'semantic-ui-react'

export default class Viewevent extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Response maxWidth={990}>
                    Viewevent mobile
                </Response>
                <Response minWidth={990}>
                    Viewevent Computer
                </Response>
            </div>
        )
    }
}