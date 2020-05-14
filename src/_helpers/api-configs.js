export const ApiConfigs = {
    base_url: process.env.VUE_APP_API_URL+'/business',
    broadcast_url: process.env.VUE_APP_API_URL+'/broadcasting',
    base_kiosk_url: process.env.VUE_APP_API_URL+'/kiosk',
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
    // CUSTOMER BOOK
    customer_book: {
        getAll: '/customer/book/:book_id?pagination=off',
        pagination: '/customer/book/:book_id?page=',
        add: '/customer/book/:book_id/add/:customer_id',
        remove: '/customer/book/:book_id/remove/:customer_id',
    },
    /* -------------------------------- */
    // BOOKING
    bookings: {
        getAll: '/booking?pagination=off',
        get: '/booking/:id',
        upload: '/booking/upload',
        pagination: '/booking?page=',
        getByDepartment: '/booking?pagination=off&department_id=',
        filter: '/booking/filter/',
        create: '/booking/create',
        availability: '/booking/available/',
        update: '/booking/:id/update',
        _delete: '/booking/:id/delete',
    },
    /* -------------------------------- */
    // BOOKING REQUESTS
    booking_requests: {
        getAll: '/booking/request?pagination=off',
        get: '/booking/request/:id',
        pagination: '/booking/request?page=',
        approve: '/booking/request/:id/approve',
        decline: '/booking/request/:id/decline',
    },
    /* -------------------------------- */
    // PRIVATE SERVICES
    private_services: {
        getAll: '/service?pagination=off',
        pagination: '/service?page=',
        get: '/service/:id',
        filter: '/service/filter/:keyword',
        create: '/service/create',
        multipleCreate: '/service/create/multiple',
        update: '/service/:id/update',
        _delete: '/service/:id/delete',
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
        logout: '/logout',
        findCustomerByPhone: '/customer/search',
        createCustomer: '/customer/create',
        joinQueue: '/queue/push',
        refresh: '/refresh',
    },
    // PRIVATE SERVICES
    displays: {
        getAll: '/display?pagination=off',
        pagination: '/display?page=',
        get: '/display/:id',
        filter: '/display/filter/:keyword',
        create: '/display/create',
        update: '/display/:id/update',
        _delete: '/display/:id/delete',
        resetPassword: '/display/:id/reset',
    },
    /* -------------------------------- */
    // FEEDBACK
    feedback: {
        getAll: '/feedback?pagination=off',
        pagination: '/feedback?page=',
        get: '/feedback/:id',
        filter: '/feedback/filter'
    },
    /* -------------------------------- */
    // NOTIFICATIONS
    notifications: {
        getAll: '/notification?pagination=off',
        pagination: '/notification?page=',
    },
    /* -------------------------------- */
    // SETTINGS
    settings: {
        getAll: '/account/setting',
        update: '/account/setting/update',
    },
    /* -------------------------------- */
    // SETTINGS
    privacy: {
        getAll: '/privacy',
        update: '/privacy/update',
        updateBusiness: '/publish/update',
        deleteAccount: '/delete',
        deleteHistory:'/history/delete'
    },
    myLiberrex: {
        getAll: '/myliberrex',
        update: '/myliberrex/update',
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
    // TEAM
    team: {
        getAll: '/team?pagination=off',
        pagination: '/team?page=',
        get: '/team/:id',
        create: '/team/create',
        update: '/team/:id/update',
        updateWorkingDays: '/team/:id/workingdays/update',
        _delete: '/team/:id/delete',
    },
    /* -------------------------------- */
    // DEPARTMENT
    department: {
        getAll: '/department?pagination=off',
        pagination: '/department?page=',
        get: '/department/:id',
        create: '/department/create',
        update: '/department/:id/update',
        _delete: '/department/:id/delete',
    },
    /* -------------------------------- */
    // BUSINESS RULES
    rules: {
        getAll: '/rules?pagination=off',
        pagination: '/rules?page=',
        get: '/rules/:id',
        create: '/rules/create',
        update: '/rules/:id/update',
        _delete: '/rules/:id/delete',
    },
    /* -------------------------------- */
    // PACKAGES
    packages: {
        getAll: '/package'
    },
    /* -------------------------------- */
    // MEMBERSHIPS
    memberships: {
        getAll: '/membership',
        get: '/membership/:id',
        update: '/membership/update'
    },
    /* -------------------------------- */
    // BILLING
    billing: {
        getAll: '/billing',
        get: '/billing/:id',
        getCoupon: '/billing/coupon/:id',
        create: '/billing/create',
        update: '/billing/:id/update',
        _delete: '/billing/:id/delete'
    },
    /* -------------------------------- */
    // STATISTICS
    statistics: {
        getAll: '/statistic',
        filter: '/statistic/filter',
        home: '/statistic/home',
        home_filter: '/statistic/home/filter',
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
    queue_requests: {
        getAll: '/queue/:queue_id/requests?pagination=off',
        get: '/queue/:queue_id/request/:id',
        pagination: '/queue/:queue_id/requests?page=',
        update: '/queue/:queue_id/request/:id/update',
        approve: '/queue/:queue_id/request/:id/approve',
        decline: '/queue/:queue_id/request/:id/decline',
        _delete: '/queue/:queue_id/request/:id/delete',
    },
    counters: {
        getAll: '/queue/:queue/counter',
        get: '/queue/:queue/counter/:counter',
        create: '/queue/:queue/counter/create',
        update: '/queue/:queue/counter/:counter/update',
        _delete: '/queue/:queue/counter/:counter/delete',
        open: '/queue/:queue/counter/:counter/open',
        close: '/queue/:queue/counter/:counter/close',
    }
};
