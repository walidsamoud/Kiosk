import { authHeader, ApiConfigs } from '../_helpers';

export const statisticsService = {
    getAll,
    filter,
    home,
    homeFilter
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.statistics.getAll}`, requestOptions).then(handleResponse);
}


function home() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.statistics.home}`, requestOptions).then(handleResponse);
}



function filter(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.statistics.filter}`, requestOptions).then(handleResponse);
}


function homeFilter(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.statistics.home_filter}`, requestOptions).then(handleResponse);
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