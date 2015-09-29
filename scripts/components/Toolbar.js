import React, {Component, PropTypes} from 'react';

class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='toolbar'>
                <div className='container'>
                    <ul className='toolbar-links'>
                        <li>
                            <input placeholder='SEARCH' type='text' />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Toolbar;
