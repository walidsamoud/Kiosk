export const ApiConfigs = {
    base_kiosk_url: process.env.VUE_APP_API_URL+'/kiosk',
    base_url: process.env.VUE_APP_API_URL+'/business',
    base_user_url: process.env.VUE_APP_API_URL+'/user',
    /* -------------------------------- */
    // PUSHER
    pusher: {
        auth: '/auth',
    },
    // ACCOUNT
    accounts: {
        login: '/account/auth',
        logout: '/account/logout',
        update_password: '/account/password/update',
        reset_password: '/account/password/reset',
        reset_update_password: '/account/password/reset/update',
        check_email: '/account/checkemail/:email',
        update: '/account/update',
        register: '/account/register'
    },
    /* -------------------------------- */
    // CUSTOMERS
    customers: {
        getAll: '/customer?pagination=1000',
        get: '/customer/:id',
        pagination: '/customer?page=',
        filter: '/customer/filter/',
        create: '/customer/create',
        update: '/customer/:id/update',
        _delete: '/customer/:id/delete',
    },
    /* -------------------------------- */
    // PRIVATE SERVICES
    kiosks: {
        getAll: '/kiosk?pagination=off',
        pagination: '/kiosk?page=',
        get: '/kiosk/:id',
        filter: '/kiosk/filter/:keyword',
        create: '/kiosk/create',
        update: '/kiosk/:id/update',
        _delete: '/kiosk/:id/delete',
        resetPassword: '/kiosk/:id/reset',
        // Kiosk APP
        login: '/auth',
        autoLogin: '/auth/:key/:token',
        logout: '/logout',
        findCustomerByPhone: '/customer/search',
        createCustomer: '/customer/create',
        joinQueue: '/queue/push',
        refresh: '/refresh',
        createBooking: '/booking/create'
    },
    /* -------------------------------- */
    // BUSINESS
    business: {
        update: '/update',
        updateLocation: '/location/update',
        update_working_days: '/workingdays/update',
    },
    /* -------------------------------- */
    // HELPERS
    helpers: {
        getAllServices: '/helpers/service?pagination=1000',
        filterServices: '/helpers/setting/filter/:keyword',
        getIndustries: '/industry',
        getCountries: '/countries'
    },
    /* -------------------------------- */
    // QUEUES
    queues: {
        // QUEUE RELATED
        getAll: '/queue?pagination=off',
        getAllWithSummary: '/queue/summary?pagination=off',
        get: '/queue/:id',
        getWithSummary: '/queue/:id/summary',
        pagination: '/queue?page=',
        paginationWithSummary: '/queue/summary?page=',
        create: '/queue/create',
        update: '/queue/:id/update',
        _delete: '/queue/:id/delete',
        getInService: '/queue/:id/inservice',
        getWaitingList: '/queue/:id/waitinglist',
        // TICKET RELATED
        push: '/queue/:id/push',
        revoke: '/queue/:queue_id/revoke/:customer_id',
        swap: '/queue/:queue_id/swap/:customer_1/:customer_2',
        pushBack: '/queue/:queue_id/pushback/:ticket_id',
        updateMember: '/queue/:queue_id/member/update/:customer_id',
        noshow: '/queue/:queue_id/noshow/:customer_id',
        redirect: '/queue/:queue_id/redirect/:customer_id/:target_id',
        callNext: '/queue/:queue_id/call',
        getTicketByUid: '/queue/uid/:uid',
        getArchivedTicketByUid: '/queue/archive/uid/:uid',
        submitFeedbackByUid: '/queue/uid/:uid/feedback',
        cancelByUid: '/queue/uid/:uid/cancel',
    },
    // BOOKINGS
    bookings: {
        getAll: '/booking',
        getConfirmed: '/booking',
        getPending: '/booking/requests',
        getArchive: '/booking/archived',
        get: '/booking/:id',
        availability: '/booking/availability',
        create: '/booking/create',
        cancelBooking: '/booking/cancel',
        cancelRequest: '/booking/requests/:id/cancel',
        getServicesByDepartement : '/getBydepartment'
    },
};
