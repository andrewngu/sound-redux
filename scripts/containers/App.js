import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {initEnvironment} from '../actions/environment';
import Desktop from '../containers/Desktop';
import Mobile from '../containers/Mobile';

class App extends Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(initEnvironment());
    }

    render() {
        const {isMobile} = this.props.environment;
        if (isMobile) {
            return <Mobile />;
        }

        return <Desktop />;
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    environment: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {environment} = state;

    return { environment };
}

export default connect(mapStateToProps)(App);
