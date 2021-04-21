import { authHeader, ApiConfigs } from '../_helpers';

export const helpersService = {
    getAllServices,
    filterServices,
    getIndustries,
    getCountries
};


function getAllServices() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getAllServices}`, requestOptions).then(handleResponse);
}


function filterServices(keyword) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.filterServices.replace(':keyword', keyword)}`, requestOptions).then(handleResponse);
}


function getIndustries() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getIndustries}`, requestOptions).then(handleResponse);
}


function getCountries() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getCountries}`, requestOptions).then(handleResponse);
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