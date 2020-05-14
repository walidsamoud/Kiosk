export default [{
        url: "/dashboard",
        name: "Dashboards",
        icon: "mdi mdi-view-dashboard",
        i18n: "Menu.Dashboard",
        index: 1,
        authorize: ['*']
    },
    {
        url: "/queues",
        name: "Queues",
        icon: "mdi mdi-clock-start",
        i18n: "Menu.Queues",
        index: 2.1,
        authorize: ['*']
    },
    {
        url: "/bookings",
        name: "Bookings",
        icon: "mdi mdi-calendar",
        i18n: "Menu.Bookings",
        index: 2.2,
        authorize: ['*']
    },
    {
        url: "/customers",
        name: "Customers",
        icon: "mdi mdi-account-circle",
        i18n: "Menu.Customers",
        index: 2.3,
        authorize: ['ADMIN', 'MANAGER']
    },
    {
        url: "/kiosks",
        name: "Kiosks",
        icon: "mdi mdi-tablet-ipad",
        i18n: "Menu.Kiosks",
        index: 2.6,
        authorize: ['ADMIN', 'MANAGER']
    },
    {
        url: "/displays",
        name: "Displays",
        icon: "mdi mdi-television",
        i18n: "Menu.Displays",
        index: 2.8,
        authorize: ['ADMIN', 'MANAGER']
    },
    {
        url: "/feedback",
        name: "Feedback",
        icon: "mdi mdi-star-half",
        i18n: "Menu.Feedback",
        index: 2.4,
        authorize: ['ADMIN', 'MANAGER']
    },
    {
        url: "/statistics",
        name: "Statistics",
        icon: "mdi mdi-chart-areaspline",
        i18n: "Menu.Statistics",
        index: 2.5,
        authorize: ['ADMIN']
    },
    /*
    {
        url: "/coupons",
        name: "Coupons",
        icon: "mdi mdi-label",
        i18n: "Menu.Coupons",
        index: 2.6,
        authorize: ['ADMIN', 'MANAGER']
    },
     */
    {
        url: "#",
        name: "Settings",
        icon: "mdi mdi-settings",
        i18n: "Menu.Settings",
        index: 6,
        authorize: ['ADMIN', 'MANAGER'],
        child: [
            {
                url: "/settings/business",
                name: "Business",
                icon: "mdi mdi-bank",
                i18n: "Menu.SettingsBusiness",
                index: 6.0,
                authorize: ['ADMIN']
            },
            {
                url: "/settings/team",
                name: "Team",
                icon: "mdi mdi-account-multiple",
                i18n: "Menu.SettingsTeam",
                index: 6.1,
                authorize: ['ADMIN', 'MANAGER']
            },
            {
                url: "/settings/departments",
                name: "Departments",
                icon: "mdi mdi-home",
                i18n: "Menu.SettingsDepartments",
                index: 6.7,
                authorize: ['ADMIN', 'MANAGER']
            },
            {
                url: "/settings/services",
                name: "Services",
                icon: "mdi mdi-square-inc",
                i18n: "Menu.SettingsServices",
                index: 6.2,
                authorize: ['ADMIN', 'MANAGER']
            },
            {
                url: "/settings/rules",
                name: "Rules",
                icon: "mdi mdi-steam",
                i18n: "Menu.SettingsRules",
                index: 6.3,
                authorize: ['ADMIN', 'MANAGER']
            },
            {
                url: "/settings/membership",
                name: "Membership",
                icon: "mdi mdi-cart-outline",
                i18n: "Menu.SettingsMembership",
                index: 6.4,
                authorize: ['ADMIN']
            },
            {
                url: "/settings/billing",
                name: "Billing",
                icon: "mdi mdi-credit-card",
                i18n: "Menu.SettingsBilling",
                index: 6.5,
                authorize: ['ADMIN']
            },
            {
                url: "/settings/general",
                name: "General",
                icon: "mdi mdi-settings-box",
                i18n: "Menu.SettingsGeneral",
                index: 6.6,
                authorize: ['ADMIN']
            }
        ],
    },
]