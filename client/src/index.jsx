import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Review from './components/Review.jsx';
import Style from './components/styles.js';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={Style.reviewComponent}>
            <Review locationId={1}/>
            </div>        
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('app'));