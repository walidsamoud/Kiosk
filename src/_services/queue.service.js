import { authHeader, ApiConfigs } from '../_helpers';

export const queueService = {
    getAll,
    getAllWithSummary,
    getPage,
    getPageWithSummary,
    getById,
    getByIdWithSummary,
    getWaitingList,
    getInService,
    update,
    create,
    push,
    callNext,
    openCounter,
    closeCounter,
    updateMember,
    markAsNoShow,
    redirect,
    revokeTicket,
    getTicketByUid,
    revokeTicketByUid,
    getArchivedTicketByUid,
    submitFeedbackByUid,
    pushBack,
    swap,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.getAll}`, requestOptions).then(handleResponse);
}


function getAllWithSummary() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.getAllWithSummary}`, requestOptions).then(handleResponse);
}


function getPage(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.pagination+page}`, requestOptions).then(handleResponse);
}


function getPageWithSummary(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.paginationWithSummary+page}`, requestOptions).then(handleResponse);
}



function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.get.replace(':id', id)}`, requestOptions).then(handleResponse);
}


function getByIdWithSummary(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.getWithSummary.replace(':id', id)}`, requestOptions).then(handleResponse);
}


function getWaitingList(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.getWaitingList.replace(':id', id)}`, requestOptions).then(handleResponse);
}


function getInService(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.getInService.replace(':id', id)}`, requestOptions).then(handleResponse);
}


function update(queue) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(queue)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.update.replace(':id', queue.id)}`, requestOptions).then(handleResponse);
}


function create(queue) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(queue)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.create}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues._delete.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function push(customer) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.push.replace(':id', customer.queue_id)}`, requestOptions).then(handleResponse);
}


function redirect(ticket) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.redirect.replace(':queue_id', ticket.queue_id)
        .replace(':customer_id', ticket.customer_id).replace(':target_id', ticket.target_id)}`
        , requestOptions).then(handleResponse);
}

function callNext(queue) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.callNext.replace(':queue_id', queue)}`, requestOptions)
        .then(handleResponse);
}

function openCounter(queue, counter) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.openCounter.replace(':id', queue).replace(':counter', counter)}`, requestOptions)
        .then(handleResponse);
}

function updateMember(queue, customer, payload) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.updateMember.replace(':queue_id', queue).replace(':customer_id', customer)}`, requestOptions)
        .then(handleResponse);
}

function markAsNoShow(queue, customer) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.noshow.replace(':queue_id', queue).replace(':customer_id', customer)}`, requestOptions)
        .then(handleResponse);
}

function closeCounter(queue, counter) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.closeCounter.replace(':id', queue).replace(':counter', counter)}`, requestOptions)
        .then(handleResponse);
}

function pushBack(queue, ticket) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.pushBack.replace(':queue_id', queue).replace(':ticket_id', ticket)}`, requestOptions)
        .then(handleResponse);
}

function swap(queue, customer_1, customer_2) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.swap.replace(':queue_id', queue)
        .replace(':customer_1', customer_1).replace(':customer_2', customer_2)}`, requestOptions)
        .then(handleResponse);
}

function revokeTicket(ticket) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
    };

    return fetch(`${ApiConfigs.base_url+ApiConfigs.queues.revoke.replace(':queue_id', ticket.queue_id)
        .replace(':customer_id', ticket.customer_id)}`, requestOptions).then(handleResponse);
}

function getTicketByUid(uid) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${ApiConfigs.base_user_url+ApiConfigs.queues.getTicketByUid.replace(':uid', uid)}`,
        requestOptions).then(handleResponse);
}

function getArchivedTicketByUid(uid) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${ApiConfigs.base_user_url+ApiConfigs.queues.getArchivedTicketByUid.replace(':uid', uid)}`,
        requestOptions).then(handleResponse);
}

function revokeTicketByUid(uid) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${ApiConfigs.base_user_url+ApiConfigs.queues.cancelByUid.replace(':uid', uid)}`,
        requestOptions).then(handleResponse);
}


function submitFeedbackByUid(data) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${ApiConfigs.base_user_url+ApiConfigs.queues.submitFeedbackByUid.replace(':uid', data.uid)}`, requestOptions).then(handleResponse);
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