import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import AssignmentIndIcon from 'material-ui-icons/AssignmentInd';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import {cyan} from 'material-ui/colors';
import Input from 'material-ui/Input';
import {connect} from 'react-redux';

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
    searchContainer: {
        backgroundColor: cyan[400],
        padding: 4,
        borderRadius: 4
    },
    input: {
        border: 'none',
        color: 'white',
        '&:before': {
            height: 0
        }
    },
    searchIcon: {
        height: 30,
        verticalAlign: 'top'
    }
};

export class AppToolbar extends React.Component {

    search(value) {
        this.props.dispatch({
            type: "ITEM_SEARCH",
            value
        });
    }

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

                        <div className={classes.searchContainer}>

                            <IconButton className={classes.searchIcon} color="contrast">
                                <SearchIcon/>
                            </IconButton>

                            <Input
                                onChange={field => {
                                    this.search(field.target.value);
                                }}
                                disableUnderline
                                defaultValue=""
                                className={classes.input}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </div>

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

export default connect()(
    withStyles(styleSheet)(AppToolbar)
);