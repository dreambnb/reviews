import React from 'react';
import ReactDOM from 'react-dom';
import Style from './styles';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }
    _handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.cb(event.target.value);
        }
      }
    render() {
        return(        
            <input placeholder='Search review' onKeyPress={this._handleKeyPress}/>
        )
    }
}

{/* <span className="fa fa-search" > </span>   */}