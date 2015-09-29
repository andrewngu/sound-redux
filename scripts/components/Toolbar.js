import React, {Component, PropTypes} from 'react';

class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='toolbar'>
                <div className='container'>
                    <div className='toolbar-items'>
                        <div className='toolbar-item'>
                            <input placeholder='SEARCH' type='text' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;
