import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    },
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('../layout/kiosk/Kiosk.vue'),
            // ======================
            // Theme routes / pages
            // ======================
            children: [
            
            {
                path: '/auth/:key/:token',
                meta:{
                    authRequired: false,
                    authorize: ['*']
                },
                component: () => import('../views/kiosk/Login.vue')
            },
            {
                path: '/login',
                name: 'KioskLogin',
                meta:{
                    authRequired: false,
                    authorize: ['*']
                },
                index: 1000,
                component: () => import('../views/kiosk/Login.vue')
            },
            {
                path: '/test',
                name: 'TestComponents',
                meta:{
                    authRequired: false,
                    authorize: ['*']
                },
                index: 1000,
                component: () => import('../views/test_components/Index.vue')
            },
            {
                path: '/Home',
                name: 'Home',
                index: 3,
                meta: {
                    authRequired: true,
                    authorize: ['*'],
                    breadcrumb: [
                    {
                        title: 'Home',
                        active: true
                    },
                    ],
                },
            },
            {
                path: '/services',
                name: 'ServicesPage',
                index: 4,
                meta: {
                    authRequired: true,
                    authorize: ['*'],
                    breadcrumb: [
                    {
                        title: 'ServicesPage',
                        active: true
                    },
                    ],
                },
                component: () => import('../views/kiosk/ServicesPage')
            },
            {
                path: '/ticket',
                name: 'Ticket',
                index: 5,
                meta: {
                    authRequired: true,
                    authorize: ['*'],
                    breadcrumb: [
                    {
                        title: 'Ticket',
                        active: true
                    },
                    ],
                },
                component: () => import('../views/kiosk/Ticket')
            },
            {
                path: '/confirmation',
                name: 'Confirmation',
                index: 6,
                meta: {
                    authRequired: true,
                    authorize: ['*'],
                    breadcrumb: [
                    {
                        title: 'Confirmation',
                        active: true
                    },
                    ],
                },
                component: () => import('../views/kiosk/Confirmation')
            },
            {
                path: '/erreur',
                name: 'Error',
                index: 7,
                meta: {
                    authRequired: true,
                    authorize: ['*'],
                    breadcrumb: [
                    {
                        title: 'Error',
                        active: true
                    },
                    ],
                },
                component: () => import('../views/kiosk/Error')
            },
          ]
        },
       


        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/Error404'
        }
    ]
})


import NProgress from 'nprogress';

router.beforeEach((to, from, next) => {

    const kioskLoggedIn = JSON.parse(localStorage.getItem('kiosk'));
    if (to.meta.authRequired && !kioskLoggedIn) {
        localStorage.setItem('kiosk', null);
        return next('/login');
    }

    next();
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})

export default router