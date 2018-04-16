import React from 'react';
import ReactDOM from 'react-dom';
import Style from './styles';

export default class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {review} = this.props;
        const createdDate = (new Date(review.createdAt)).toLocaleDateString();
        return (
            <div style={Style.reviewItemContainer}>
                <div style={Style.userDetailsContainer}>
                    <div style={Style.profilePicStyle}>{review.customerProfilePhotoUrl}</div>
                    <div style={Style.nameContainer}>
                        <div style={Style.nameStyle}>{review.customerName}</div>
                        <div style={Style.dateStyle}>{createdDate}</div>
                    </div>
                </div>
                <div style={Style.reviewTextContainer}>{review.customerReview}</div>
            </div>   
        )
    }
}