import { authHeader, ApiConfigs } from '../_helpers';

export const myLiberrexService = {
    getAll,
    update,
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.myLiberrex.getAll}`, requestOptions).then(handleResponse);
}


function update(settings) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.myLiberrex.update}`, requestOptions).then(handleResponse);
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