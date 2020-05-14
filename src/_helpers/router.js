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
            children: [{
                path: '/',
                redirect: '/login',
                meta:{
                    authRequired: false,
                    authorize: ['*']
                }
            }, {
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
                path: '/logout',
                name: 'KioskLogout',
                meta:{
                    authRequired: false,
                    authorize: ['*']
                },
                index: 1001,
                component: () => import('../views/kiosk/Logout.vue')
            }
            ,{
                path: '/checkin',
                name: 'Checkin',
                meta:{
                    authRequired: false,
                    authorize: ['*']
                },
                index: 10002,
                component: () => import('../views/kiosk/Checkin.vue')
            }]
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