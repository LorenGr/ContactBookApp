import _ from 'lodash';
import {remove} from 'lodash';

export default function items(state = {}, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case "ITEM_DELETE_MODAL_SHOW" :
            new_state.modal = new_state.modal || {};
            new_state.modal.ITEM_DELETE = {
                show: true,
                id: action.id,
                name: action.name
            };
            return new_state;
        case "ITEM_DELETE_MODAL_HIDE" :
            new_state.modal.ITEM_DELETE = {
                show: false,
                id: 0,
                name: ""
            };
            return new_state;
        case "ITEM_SEARCH" :
            new_state.searchTerm = action.value;
            return new_state;
        case "ITEM_DELETE_SUCCESS" :
            _.remove(new_state.list.data,
                item => item['_id'] === action.items.data
            );
            return new_state;

        case "ITEM_FETCH_LIST_SUCCESS" :
            new_state.list = action.items;
            return new_state;

        case "ITEM_FETCH_SUCCESS" :
            if (!new_state.listDetails) new_state.listDetails = [];
            _.remove(new_state.listDetails,
                item => item['_id'] === action.item.data
            );
            new_state.listDetails.push(action.item.data);
            return new_state;

        case "ITEM_ADD_SUCCESS" :
            new_state.list.data.push(action.items.data);
            return new_state;

        case "ITEM_EDIT_SUCCESS" :
            if (new_state.list.data.length) {
                for (const item of new_state.list.data) {
                    if (item["_id"] === action.items.data["_id"]) {
                        Object.assign(item, action.items.data);
                        break;
                    }
                }
            }
             _.remove(new_state.listDetails,
                item => item['_id'] === action.items.data["_id"]
            );
            return new_state;

        default :
            return state;
    }
}
