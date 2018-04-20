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
            <div style={Style.summaryReviewSearchBarInputDiv}> 
                <input type='text' style={Style.summaryReviewSearchBarInput} placeholder='Search review' onKeyPress={this._handleKeyPress}/>  
                <label style={Style.summaryReviewSearchBarInputLabel}><i className='fas fa-search'></i></label>   
            </div>
        )
    }
}

{/* <span className="fa fa-search" > </span>   */}