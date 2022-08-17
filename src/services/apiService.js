let requester = (url, method, data) => {
    let options = {
        method: method,
        headers: {}
    };

    if (method !== 'GET') {
        options.headers['content-type'] = 'application/json';
    }

    let user = localStorage.getItem('user');

    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options);
}

export let get = (url) => {
    return requester(url, 'GET');
}

export let post = (url, data) => {
    return requester(url, 'POST', data);
}

export let put = (url, data) => {
    return requester(url, 'PUT', data);
}

export let del = (url) => {
    return requester(url, 'DELETE');
}