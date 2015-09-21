import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class App extends Component {
    render() {
        return (
            <div>Hello</div>
        );
    }
}

App.PropTypes = {};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(App);
