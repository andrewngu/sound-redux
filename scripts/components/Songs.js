import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

function loadData(props) {
    loadSongs();
}

class Songs extends Component {
    render() {
        return <div></div>;
    }
}

Songs.propTypes = {
    songs: PropTypes.object.isRequired,
};

export default Songs;
