const fetch = require("node-fetch");

module.exports = class Request {
    constructor(url) {
        this.BASE_URL = url;
    }

    async get(uri) {
        const requestURL = this.BASE_URL + uri + '&acl:consumerKey=e4e94d49da4866b76b2fc33016e7a3f792e459762199754561eb2b788fda68ee';
        const result = await fetch(requestURL, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        return result.json();
    }

    async post(uri, data) {
        const requestURL = this.BASE_URL + uri;
        let result;
        try {
            result = await fetch(requestURL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (e) {
            throw e;
        }
        return result.json();
    }

    async put(uri, data) {
        const requestURL = this.BASE_URL + uri;
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return result.json();
    }

    async delete(uri) {
        const requestURL = this.BASE_URL + uri;
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return true;
    }
}