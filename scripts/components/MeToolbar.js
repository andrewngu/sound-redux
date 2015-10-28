import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';

const PATHS = ['stream', 'likes', 'playlists'];

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

    render() {
        return (
            <div className='toolbar'>
                <div className='container'>
                    <div className='toolbar-items'>
                        {this.renderItems()}
                    </div>
                </div>
            </div>
        );
    }
}

export default MeToolbar;
