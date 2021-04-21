import { authHeader, ApiConfigs } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    checkEmail,
    getById,
    update,
    updatePassword,
    requestPasswordReset,
    passwordReset,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };


    return fetch(`${ApiConfigs.base_url+ApiConfigs.accounts.login}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.accounts.logout}`, requestOptions)
        .then(handleResponse)
        .then(function () {
            localStorage.removeItem('user');
            localStorage.removeItem('targetCounter')
        });

}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {  },
        body: user
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.accounts.register}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url}/users`, requestOptions).then(handleResponse);
}


function checkEmail(email) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.accounts.check_email.replace(':email', email)}`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: user
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.accounts.update}`, requestOptions).then(handleResponse);
}


function updatePassword(password) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),  'Content-Type': 'application/json' },
        body: JSON.stringify(password)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.accounts.update_password}`, requestOptions).then(handleResponse);
}

function requestPasswordReset(password) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),  'Content-Type': 'application/json' },
        body: JSON.stringify(password)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.accounts.reset_password}`, requestOptions).then(handleResponse);
}

function passwordReset(password) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),  'Content-Type': 'application/json' },
        body: JSON.stringify(password)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.accounts.reset_update_password}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                if(localStorage.getItem('user')){
                    logout();
                }
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}