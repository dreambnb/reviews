import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('clicked-',this.props.index);
        //make a get request to server with page number
        this.props.cb(this.props.index);
    }
    render() {
        const paginationStyle = {
            border: '1px solid black',
            borderRadius: '40%',
            width: '100px',
            display: 'inline',
        }
        return (
            <div style={paginationStyle} onClick={this.handleClick}>{this.props.index}</div>         
        )
    }
}