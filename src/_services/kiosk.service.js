import { authHeader, authKioskHeader, ApiConfigs } from '../_helpers';

export const kioskService = {
    getAll,
    getPage,
    filter,
    getById,
    update,
    create,
    resetPassword,
    delete: _delete,
    login,
    autoLogin,
    logout,
    findCustomerByPhoneNumber,
    createCustomer,
    getQueueById,
    joinQueue,
    refresh,
    createBooking
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.kiosks.getAll}`, requestOptions).then(handleResponse);
}


function getPage(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.kiosks.pagination+page}`, requestOptions).then(handleResponse);
}


function filter(keyword) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.kiosks.filter.replace(':keyword', keyword)}`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.kiosks.get.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function update(id, kiosk) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: kiosk
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.kiosks.update.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function resetPassword(id) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: {}
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.kiosks.resetPassword.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function create(kiosk) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: kiosk
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.kiosks.create}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.kiosks._delete.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function findCustomerByPhoneNumber(phone) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authKioskHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(phone)
    };

    return fetch(`${ApiConfigs.base_kiosk_url+ApiConfigs.kiosks.findCustomerByPhone}`, requestOptions).then(handleResponse);
}

function createCustomer(customer) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authKioskHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    };

    return fetch(`${ApiConfigs.base_kiosk_url+ApiConfigs.kiosks.createCustomer}`, requestOptions).then(handleResponse);
}

function joinQueue(data) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authKioskHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${ApiConfigs.base_kiosk_url+ApiConfigs.kiosks.joinQueue}`, requestOptions).then(handleResponse);
}

function createBooking(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authKioskHeader()},
        body: data
    };
    return fetch(`${ApiConfigs.base_kiosk_url + ApiConfigs.kiosks.createBooking}`, requestOptions).then(handleResponse);
}

function login(key, secret) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, secret })
    };

    return fetch(`${ApiConfigs.base_kiosk_url+ApiConfigs.kiosks.login}`, requestOptions)
    .then(handleResponse)
    .then(kiosk => {
        // login successful if there's a jwt token in the response
        if (kiosk.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if(localStorage.getItem("kiosk") != JSON.stringify(kiosk)){
                localStorage.setItem('kiosk', JSON.stringify(kiosk));
                console.log('reloading');
                location.reload();
            }
        }
        return kiosk;
    });
}

function autoLogin(key, token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${ApiConfigs.base_kiosk_url+ApiConfigs.kiosks.autoLogin
        .replace(':key', key).replace(':token', token)}`, requestOptions)
        .then(handleResponse)
        .then(kiosk => {
            // login successful if there's a jwt token in the response
            if (kiosk.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(localStorage.getItem("kiosk") != JSON.stringify(kiosk)){
                    localStorage.setItem('kiosk', JSON.stringify(kiosk));
                    console.log('reloading');
                    location.reload();
                }
            }
            return kiosk;
        });
}

function logout() {
    // remove user from local storage to log user out
    const requestOptions = {
        method: 'POST',
        headers: { ...authKioskHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${ApiConfigs.base_kiosk_url+ApiConfigs.kiosks.logout}`, requestOptions)
    .then(handleResponse)
    .then(function () {
        localStorage.removeItem('kiosk');
    });
}

function getQueueById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authKioskHeader()
    };

    return fetch(`${ApiConfigs.base_kiosk_url+ApiConfigs.queues.get.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function refresh() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authKioskHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${ApiConfigs.base_kiosk_url+ApiConfigs.kiosks.refresh}`, requestOptions)
        .then(handleResponse)
        .then(kiosk => {
            localStorage.setItem('kiosk', JSON.stringify(kiosk));
            return kiosk;
        });
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