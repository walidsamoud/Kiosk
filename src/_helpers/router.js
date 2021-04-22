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
                path: '/',
                redirect: '/login',
                meta:{
                    authRequired: false,
                    authorize: ['*']
                }
            },
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
                path: '/Home',
                name: 'Home',
                index: 2,
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
                component: () => import('../views/kiosk/Home')
            },
            {
                path: '/services',
                name: 'ServicesPage',
                index: 2,
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
                index: 2,
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
                index: 2,
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

    //const kioskLoggedIn = JSON.parse(localStorage.getItem('kiosk'));
    if (to.meta.authRequired ) {
        localStorage.setItem('kiosk', null);
        return next('/home');
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