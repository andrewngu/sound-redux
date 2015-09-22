import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class Songs extends Component {
    render() {
        const items = this.props.songs.items.map((song)=> <div>{song.title}</div>);
        return (
            <div>
                {items}
            </div>
        );
    }
}

Songs.propTypes = {
    songs: PropTypes.object.isRequired,
};

export default Songs;
