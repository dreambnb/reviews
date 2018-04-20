import React from 'react';
import ReactDOM from 'react-dom';
import Style from './styles';

export default class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { review } = this.props;
        console.log('created date-', review.createdAt, typeof review.createdAt);
        let options = {  
            year: 'numeric',
            month: 'long',
        };
        const createdDate = (new Date(review.createdAt)).toLocaleDateString('en-us', options);
        return (
            <div style={Style.reviewItemContainer}>
                <div style={Style.userDetailsContainer}>
                    <img src={review.customerProfilePhotoUrl} style={Style.profilePicStyle} />
                    <div style={Style.nameContainer}>
                        <div style={Style.nameStyle}>{review.customerName}</div>
                        <div style={Style.dateStyle}>{createdDate}</div>
                    </div>
                </div>
                <div style={Style.reviewTextContainer}>
                    <span >
                        <div id={"reviewTextElement"}lines={3}>
                        {review.customerReview}
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

{/* <Truncate lines={3} ellipsis={<span>... <a href='#' style='color:#008489'>Read more</a></span>}>
                {longText}
            </Truncate> */}
// ellipsis={<span>...<a href='#' style={{'color':'#008489'}}