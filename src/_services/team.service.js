import { authHeader, ApiConfigs } from '../_helpers';

export const teamService = {
    getAll,
    getPage,
    getById,
    update,
    create,
    updateWorkingDays,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.team.getAll}`, requestOptions).then(handleResponse);
}


function getPage(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.team.pagination+page}`, requestOptions).then(handleResponse);
}



function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.team.get.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function update(id, member) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: member
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.team.update.replace(':id', id)}`, requestOptions).then(handleResponse);
}


function updateWorkingDays(id, workingDays) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(workingDays)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.team.updateWorkingDays.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function create(member) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: member
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.team.create}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.team._delete.replace(':id', id)}`, requestOptions).then(handleResponse);
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