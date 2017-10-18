import React from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem';
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

    render() {
        return this.props.items.length ? (
            <div id="items" style={{marginLeft: 30}}>
                {this.props.items.map(item => {
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
    }
}

function mapStateToProps(state) {
    return ({
        items: state.items.list && state.items.list.data || [],
        noMore: state.items.list && state.items.list.status === code_INCOMPLETE_DATA
    });
}

export default connect(mapStateToProps)(List);