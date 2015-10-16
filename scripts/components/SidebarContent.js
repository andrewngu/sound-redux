import React, {Component, PropTypes} from 'react';

class SidebarContent extends Component {
    componentWillUnmount() {
        document.body.style.overflow = 'auto';
    }

    handleMouseEnter() {
        document.body.style.overflow = 'hidden';
    }

    handleMouseLeave() {
        document.body.style.overflow = 'auto';
    }

    render() {
        const {children, className, height} = this.props;

        return (
            <div
                className={'sidebar-content' + (className ? ` ${className}` : '')}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{maxHeight: height}}>
                {children}
            </div>
        );
    }
}


SidebarContent.propTypes = {
    height: PropTypes.number.isRequired,
};

export default SidebarContent;
