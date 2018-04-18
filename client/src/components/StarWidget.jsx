import React from 'react';
import ReactDOM from 'react-dom';
import Style from './styles';
import StarRatings from 'react-star-ratings';

export default class StarWidget extends React.Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (                
            <span>
            <StarRatings
            rating={this.props.rating}
            starRatedColor='#30a88a'
            starDimension="20px"
            starSpacing="0px"
            numberOfStars={5}
            />
            </span>
          );
      }
}
