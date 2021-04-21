import { kioskService } from '../_services';
import { router } from '../_helpers';

const kiosk = JSON.parse(localStorage.getItem('kiosk'));
const state = kiosk
    ? { status: { loggedIn: true }, kiosk }
    : { status: {}, kiosk: null };

const actions = {
    async login({ dispatch, commit }, { key, secret }) {
        commit('loginRequest');
        await kioskService.login(key, secret)
            .then(
                kiosk => {
                    commit('loginSuccess', kiosk);
                    router.push('/checkin');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                    throw new Error("Key and Secret do not match our records")
                }
            );
    },
    async autoLogin({ dispatch, commit }, { key, token }) {
        commit('loginRequest');
        await kioskService.autoLogin(key, token)
            .then(
                kiosk => {
                    commit('loginSuccess', kiosk);
                    router.push('/checkin');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                    throw new Error("Key and Secret do not match our records")
                }
            );
    },
    async refresh({ commit }) {
        commit('refreshRequest');
        await kioskService.refresh()
            .then(
                kiosk => {
                    commit('refreshSuccess', kiosk);
                },
                error => {
                    commit('refreshFailure', error);
                }
            );
    },
    logout({ commit }) {
        kioskService.logout();
        commit('logout');
    },
    updateKioskObject({ commit }){
        commit('updateKioskObject', JSON.parse(localStorage.getItem('kiosk')))
    }
};

const mutations = {
    loginRequest(state) {
        state.status = { loggingIn: false };
        state.kiosk = null;
    },
    loginSuccess(state, kiosk) {
        state.status = { loggedIn: true };
        state.kiosk = kiosk;
    },
    loginFailure(state) {
        state.status = {};
        state.kiosk = null;
    },
    refreshRequest() {
    },
    refreshSuccess(state, kiosk) {
        state.status = { loggedIn: true };
        state.kiosk.kiosk = kiosk.kiosk;
        state.kiosk.business = kiosk.business;
        localStorage.setItem('kiosk', JSON.stringify(state.kiosk))
    },
    refreshFailure(state) {
        state.status = {};
        state.kiosk = null;
    },
    logout(state) {
        state.status = {};
        state.kiosk = null;
    },
    registerRequest(state, kiosk) {
        state.status = { registering: true };
        state.kiosk = kiosk;
    },
    registerSuccess(state, kiosk) {
        state.status = {loggedIn: true };
        state.kiosk = kiosk;
    },
    registerFailure(state) {
        state.status = {loggedIn: false};
        state.kiosk = null;
    },
    updateUserObject(state, kiosk){
        state.kiosk = kiosk;
    }
};

export const Kiosk = {
    namespaced: true,
    state,
    actions,
    mutations
};