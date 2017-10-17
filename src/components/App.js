import React from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import AppStructure from './AppStructure';

const themes = {
    dark: createMuiTheme({
        palette: {
            type: 'light'
        }
    }),
    light: createMuiTheme({
        palette: {
            type: 'light'
        }
    })
};

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={themes.dark}>
                <AppStructure {...this.props} />
            </MuiThemeProvider>
        );
    }
}
