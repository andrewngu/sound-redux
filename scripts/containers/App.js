import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Songs from '../containers/Songs';

class App extends Component {
    render() {
        return (
            <Songs />
        );
    }
}

App.PropTypes = {};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(App);
