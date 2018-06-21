var vue = require('vue');
var vuex = require('vuex');

var getters = require('./getters.js');
var actions = require('./actions.js');

vue.use(vuex);

//===== STATE =====
var state = {
  authLock: false,
  authToken: localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken') || ''
};

//===== MUTATIONS =====
var mutations = {
  setState(state, data){
    state = Object.assign(state, data);
  },
  resetState(state, data){
    state = Object.assign(state, {
      authLock: false,
      authToken: '',
      refreshToken: ''
    });
  }
};


module.exports = new vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
});