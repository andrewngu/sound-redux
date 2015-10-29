import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import Popover from '../components/Popover';

const PATHS = ['stream', 'likes'];

class MeToolbar extends Component {
    renderItems() {
        const {dispatch, route} = this.props;
        return PATHS.map(path =>
            <Link
                className={'toolbar-item toolbar-genre' + (path === route.path[1] ? ' active' : '')}
                dispatch={dispatch}
                key={path}
                route={{path: ['me', path]}}>
                {path}
            </Link>
        );
    }

    renderPlaylists() {
        const {authed, authedPlaylists} = this.props;
        return authed.playlists.map(playlistId => {
            const playlist = authedPlaylists[playlistId];
            console.log(playlist);
            <div className='toolbar-playlist'>
                <div></div>
            </div>
        });
    }

    render() {
        return (
            <div className='toolbar'>
                <div className='container'>
                    <div className='toolbar-items'>
                        {this.renderItems()}
                        <Popover className='toolbar-item toolbar-genre bottom-left'>
                            <span>playlists</span>
                            <div className='toolbar-popover popover-content'>
                                {this.renderPlaylists()}
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeToolbar;
