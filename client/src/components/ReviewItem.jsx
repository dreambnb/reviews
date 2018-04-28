import React from 'react';
import ReactDOM from 'react-dom';
import Truncate from 'react-truncate';
import Style from './styles';

export default class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            truncated: false
        };
        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }

    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }
    toggleLines(event) {
        event.preventDefault(); 
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const { review } = this.props;
        const lines = 3;
        const {
            expanded,
            truncated 
        } = this.state;
 
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
                        <div>
                        <Truncate
                            lines={!expanded && lines}
                            ellipsis={(
                                <span>... <a href='#' onClick={this.toggleLines} style={{'color':'#008489'}}>Read more</a></span>
                            )}
                            onTruncate={this.handleTruncate}
                        >
                        {review.customerReview}
                        </Truncate>
                        </div>          
                    </span>
                </div>
            </div>
        )
    }
}