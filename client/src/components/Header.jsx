import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class Header extends React.Component {
    render() {
        const rightElement = <FlatButton label={this.props.connected ? 'Connected' : 'Error'} disabled={true} />;

        return (
            <AppBar
                className="App__AppBar"
                title="Pesda Board"
                showMenuIconButton={false}
                iconElementRight={rightElement}
            />
        );
    }
}

Header.propTypes = {
    connected: PropTypes.bool,
};
