import { authHeader, ApiConfigs } from '../_helpers';

export const customerBookService = {
    getAll,
    getPage,
    add,
    remove
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.customer_book.getAll}`, requestOptions).then(handleResponse);
}


function getPage(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.customer_book.pagination+page}`, requestOptions).then(handleResponse);
}


function add(book, customer) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.customer_book.add.replace(':book_id', book)
        .replace(':customer_id', customer)}`, requestOptions).then(handleResponse);
}


// prefixed function name with underscore because delete is a reserved word in javascript
function remove(book, customer) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.customer_book.remove.replace(':book_id', book)
        .replace(':customer_id', customer)}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}