import React from 'react';
import ReactDOM from 'react-dom';
import Style from './styles';
import StarWidget from './StarWidget.jsx';

export default class Ratings extends React.Component {
    constructor(props) {
        super(props);
        this.renderRatings=this.renderRatings.bind(this);
    }
    renderRatings () {
        const ratingCategory = []
        console.log('ratings.jsx-',this.props.averageRatings)
        for (var key in this.props.averageRatings) {
            ratingCategory.push(<div key={key}>{key}
                <span><StarWidget rating={this.props.averageRatings[key]}/></span>
            </div>);
        }
        return ratingCategory;
    }
    render() {
        return(  
            <div>                      
            <div>{this.renderRatings()}</div>  
            </div>        
        )
    }
}
