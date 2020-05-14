import { authHeader, ApiConfigs } from '../_helpers';

export const bookingService = {
    getAll,
    getPage,
    search,
    availableSlots,
    getById,
    getByDepartment,
    update,
    create,
    upload,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.getAll}`, requestOptions).then(handleResponse);
}


function getPage(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.pagination+page}`, requestOptions).then(handleResponse);
}


function getByDepartment(department) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.getByDepartment+department}`, requestOptions).then(handleResponse);
}


function search(date) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.filter+date}`, requestOptions).then(handleResponse);
}


function availableSlots(date, payload) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.availability+date+(payload ? '?dep='+payload.department : '')}`,
        requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.get.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function update(booking) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.update.replace(':id', booking.id)}`, requestOptions).then(handleResponse);
}

function create(booking) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.create}`, requestOptions).then(handleResponse);
}


function upload(payload) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: payload
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings.upload}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.bookings._delete.replace(':id', id)}`, requestOptions).then(handleResponse);
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