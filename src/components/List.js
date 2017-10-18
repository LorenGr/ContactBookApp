import React from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import {Link} from 'react-router';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';

const code_INCOMPLETE_DATA = 206;

function dispatchFetch() {
    this.dispatch({
        type: 'ITEM_FETCH_LIST'
    });
}

export class List extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.items.length) dispatchFetch.call(this.props);
    }

    isFoundIn(item, searchTerm) {
        return item['first_name'].toLowerCase()
                .indexOf(searchTerm.toLowerCase()) !== -1
            || item['last_name'].toLowerCase()
                .indexOf(searchTerm.toLowerCase()) !== -1;
    }

    render() {

        const {searchTerm, items} = this.props;

        const filteredItems = searchTerm ?
            items.filter(
                item => this.isFoundIn(item, searchTerm)
            ) : items;

        const renderedContacts = filteredItems ? (
            <div id="items" style={{marginLeft: 30}}>
                {filteredItems.map(item => {
                    return (
                        <ListItem key={item['_id']} item={item}/>
                    )
                })}
            </div>
        ) : (
            <Typography color="inherit" type="title">
                No Contacts Found
            </Typography>
        );

        return (
            <div>
                {renderedContacts}
                <Link style={
                    {
                        position:'fixed',
                        bottom : 40, right : 80
                    }
                } to={'edit'}>
                    <Button fab color="accent"
                                aria-label="Menu">
                        <AddIcon/>
                    </Button>
                </Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        items: state.items.list && state.items.list.data || [],
        searchTerm: state.items.searchTerm,
        noMore: state.items.list && state.items.list.status === code_INCOMPLETE_DATA
    });
}

export default connect(mapStateToProps)(List);