import axios from "axios";

// const baseURL = "http://localhost:2410/svr";
const baseURL = "https://afternoon-brushlands-77830.herokuapp.com/svr";

function get(url) {
    return axios.get(baseURL + url);
}

function post(url, obj) {
    return axios.post(baseURL + url, obj);
}

function put(url, obj) {
    return axios.put(baseURL + url, obj);
}

function deleteApi(url) {
    return axios.delete(baseURL + url);
}

export default {
    get,
    post,
    put,
    deleteApi,
};