import React, {Component, PropTypes} from 'react';

class Song extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

Song.propTypes = {
    song: PropTypes.object.isRequired
};

export default Song;
