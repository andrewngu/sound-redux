import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { loadSongs } from '../actions/SongActions';

function loadData(props) {
    loadSongs();
}

class Songs extends Component {
    render() {
        return <div></div>;
    }
}


function mapStateToProps(state, ownProps) {
    const {
        entities: {songs}
    } = state;

    return {};
}


export default connect(
    mapStateToProps,
    {loadSongs}
)(Songs);
