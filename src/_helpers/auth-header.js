export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            'Authorization': 'Bearer ' + user.token,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Language': localStorage.getItem('Language')
        };
    } else {
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Language': localStorage.getItem('Language')
        };
    }
}

export function authKioskHeader() {
    // return authorization header with jwt token
    let kiosk = JSON.parse(localStorage.getItem('kiosk'));

    if (kiosk && kiosk.token) {
        return {
            'Authorization': 'Bearer ' + kiosk.token,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Language': localStorage.getItem('Language')
        };
    } else {
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Language': localStorage.getItem('Language')
        };
    }
}