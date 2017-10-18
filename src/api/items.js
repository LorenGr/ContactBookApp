import axios from 'axios';

const base = String(API_URL) + "/api/contacts/";
export default class ApiItems {

    static getList(limit) {
        return axios.get(base);
    }

    static getItem(id) {
        return axios.get(base + id);
    }

    static editList(payload) {
        return axios.put(base
            + payload[0]['_id']
            , payload[0]);
    }

    static deleteList(payload) {
        return axios.delete(base
            + payload);
    }

    static addList(payload) {
        return axios.post(base
            , payload[0]);
    }
}