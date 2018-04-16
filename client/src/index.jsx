import React from 'react';
import ReactDOM from 'react-dom';
import Review from './components/Review.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <div>Review below</div>
            <Review locationId={1}/>
            </div>        
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('app'));