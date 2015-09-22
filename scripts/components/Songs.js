import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class Songs extends Component {
    render() {
        let items = this.props.songs.items.map((song)=> <div>{song.title}</div>);
        return (
            <div>
                <h2>Hello</h2>
                {items}
            </div>
        );
    }
}

Songs.propTypes = {
    songs: PropTypes.object.isRequired,
};

export default Songs;
