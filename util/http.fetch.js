/**
 * http for node by Cassandra 2018.12.11
 */

const fetch = require('node-fetch');
// const logger = require('../service/log.service');

let Config = {
    Token: null,
    Headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "node-fetch"
    },
    credentials: "include"
};

const http = (method, url, data, traceId) => {

    let body = data ? JSON.stringify(data) : null;
    let headers = {
        ...Config.Headers,
        trace_id: traceId,
        User_Agent: 'NodeFetch',
        Authorization: Config.Token
    };

    return fetch(url, {method, headers, body})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                let err = {status, statusText} = response;
                return Promise.reject(err);
            }
        })
        .then(json => {
            return json;
        })
        .catch(e => {
            Promise.reject(e);
        });
};

const get = ({url, data, traceId}) => http('GET', url, data, traceId);

const post = ({url, data, traceId}) => http('POST', url, data, traceId);

const put = ({url, data, traceId}) => http('PUT', url, data, traceId);

const del = ({url, data, traceId}) => http('DELETE', url, data, traceId);


module.exports = {get, post, put, del};