import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Style from './styles.js';

export default class Paginations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleClick = this.handleClick.bind(this);
        this.renderPageIndex = this.renderPageIndex.bind(this);
    }
    handleClick(i) {
        console.log('clicked-', i);
        //make a get request to server with page number
        this.props.cb(i);
    }
    // renderPageIndex() {
    //     const pageIndex = [];
    //     let totalReviews = this.props.searchReviews;
    //     for(let i = 1; i <= Math.ceil((totalReviews/5)); i++) {
    //         pageIndex.push(<button key={i} onClick={this.handleClick.bind(this,i)}>{i}</button>);              
    //     }
    //     return pageIndex;
    // }
    // render() {
    //     const paginationStyle = {
    //         border: '1px solid black',
    //         borderRadius: '40%',
    //         width: '100px',
    //         display: 'inline',
    //     }
    //     return (
    //         <div style={paginationStyle}>{this.renderPageIndex()}</div>
    //     )
    // }
    renderPageIndex() {
        const pageIndex = [];
        let totalReviews = this.props.searchReviews;
        for(let i = 1; i <= Math.ceil(totalReviews/5); i++) {
            pageIndex.push(
                    <PaginationItem key={i} onClick={this.handleClick.bind(this,i)}>
                        <PaginationLink href="#">{i}</PaginationLink>
                    </PaginationItem>)           
        }
        return pageIndex;
    }
    render() {
        return (
            <div style={Style.pageIndexStyling}>
                <Pagination style={Style.pageIndexStyling} size="lg">
                    {this.renderPageIndex()}
                </Pagination>
            </div>
        )
    }
}