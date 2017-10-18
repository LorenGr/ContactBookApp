import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AssignmentIndIcon from 'material-ui-icons/AssignmentInd';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import {cyan} from 'material-ui/colors';

const styleSheet = {
    root: {
        width: '100%',
    },
    bar: {
        backgroundColor: cyan[700]
    },
    flex: {
        flex: 1,
    },
};

export class AppToolbar extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <AssignmentIndIcon/>
                        </IconButton>

                        <Typography color="inherit" type="title" className={classes.flex}>
                            My Contacts
                        </Typography>

                        <Link to={'edit'}>
                            <IconButton color="contrast" aria-label="Menu">
                                <PersonAddIcon/>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

export default withStyles(styleSheet)(AppToolbar);