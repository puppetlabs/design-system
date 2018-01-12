import React from 'react';

const propTypes = {
    message: React.PropTypes.string,
};

const defaultProps = {
    message: '',
};

class MenuActionsMessage extends React.Component {
    render() {
        return (
            <div className="rc-menu-actions-message">
                { this.props.message || this.props.children }
            </div>
        );
    }
}

MenuActionsMessage.propTypes = propTypes;
MenuActionsMessage.defaultProps = defaultProps;

export default MenuActionsMessage;
