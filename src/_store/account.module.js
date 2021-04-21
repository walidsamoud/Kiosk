import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    async login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });

        await userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('dashboard');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                    throw new Error("Email and Password do not match our records")
                }
            );
    },
    async logout({ commit }) {
        await userService.logout();
        commit('logout');
    },
    async register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        await userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/dashboard/?onboarding=on');
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                    throw new Error("Cannot register")
                }
            );
    },
    updateUserObject({ commit }){
        commit('updateUserObject', JSON.parse(localStorage.getItem('user')))
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
        state.user = user;
    },
    registerSuccess(state, user) {
        state.status = {loggedIn: true };
        state.user = user;
    },
    registerFailure(state) {
        state.status = {loggedIn: false};
        state.user = null;
    },
    updateUserObject(state, user){
        state.user = user;
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};