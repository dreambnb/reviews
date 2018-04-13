import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Style from './styles';
import ReviewItem from './ReviewItem'
import Pagination from './Pagination.jsx';

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews : [],
            totalReviews : 0,
            pageIndex : 0,
        };
        this.getReviews = this.getReviews.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
    }
    componentDidMount() {
        this.getReviews(this.state.pageIndex);
    }
    getReviews(pageIndex){
        axios.get(`http://127.0.0.1:3000/reviews/`, {
            params : {
                index: pageIndex,
            }
        })
        .then(reviews => { 
            // console.log('axios get req reviews-', reviews)
            this.setState({reviews: reviews.data.getFive, totalReviews: reviews.data.len})
        })
        //reviews => this.setState({reviews: reviews.data})) 
        .catch(function(error) {
            console.log('axios get req error-', error)
        });
    }
    renderReviews() {
        console.log('inside renderReviews() reviews and count-', this.state.reviews);    
        return this.state.reviews.map((review, index) => {
            return <ReviewItem key={index} review={review}/>
        })
    }
    renderPagination() {
        var indexBox = [];
        for(var i = 1; i <= (this.state.totalReviews/5); i++) {
            indexBox.push(<Pagination key={i} index={i} cb={this.getReviews}/>);
        }
        // console.log('inside renderPagination-indexBox-', indexBox);
        return indexBox;                   
    }
    render() {      
        return (
            <div>
            <div>this is from child component</div> 
            <div>{this.renderReviews()}</div> 
            <div>{this.renderPagination()}</div>
            </div>        
        )
    }
}