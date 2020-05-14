import { authHeader, ApiConfigs } from '../_helpers';

export const rulesService = {
    getAll,
    getPage,
    getById,
    update,
    create,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.rules.getAll}`, requestOptions).then(handleResponse);
}


function getPage(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.rules.pagination+page}`, requestOptions).then(handleResponse);
}



function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.rules.get.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function update(rule) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(rule)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.rules.update.replace(':id', rule.id)}`, requestOptions).then(handleResponse);
}

function create(rule) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(rule)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.rules.create}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.rules._delete.replace(':id', id)}`, requestOptions).then(handleResponse);
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