/* Importing main framework modules */
import React from 'react';
import ReactDOM from 'react-dom';

/* Importing additional modules */
import injectTapEventPlugin from 'react-tap-event-plugin';

/* Importing Material-UI modules */
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/* Importing app component */
import App from './components/App';

/**
 * Start application.
 */
async function main() {
    require('./index.css');

    /* Initialize some stuff for Material-UI */
    injectTapEventPlugin();

    const Main = () => (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <App />
        </MuiThemeProvider>
    );
    ReactDOM.render(<Main />, document.querySelector('#mount'));
}

main().then(() => {
    //
});
