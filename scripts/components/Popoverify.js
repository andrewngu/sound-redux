import React, {Component, PropTypes} from 'react';

export default function(InnerComponent) {
    return class PopoverComponent extends Component {
        constructor(props) {
            super(props);
            this.togglePopoverOpen = this.togglePopoverOpen.bind(this);
            this.state = {
                popoverOpen : false
            };
        }

        togglePopoverOpen() {
            this.setState({popoverOpen: !this.state.popoverOpen});
        }

        render() {
            return (
                <div onClick={this.togglePopoverOpen}
                    <InnerComponent {...this.props} popoverOpen={this.state.popoverOpen} />
                </div>
            );
        }
    }
}
