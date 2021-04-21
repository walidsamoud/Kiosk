import { authHeader, ApiConfigs } from '../_helpers';

export const businessService = {
    update,
    updateLocation,
    updateWorkingDays
};


function update(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: data
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.business.update}`, requestOptions).then(handleResponse);
}


function updateLocation(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.business.updateLocation}`, requestOptions).then(handleResponse);
}


function updateWorkingDays(workingDays) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(workingDays)
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.business.update_working_days}`, requestOptions).then(handleResponse);
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