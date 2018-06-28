var axios = require('axios');

var config = require('../../config');

//===== ACTIONS =====
var actions = {
  //DONE: request <url> <query>
  request({ state, commit, getters, dispatch }, data){
    return q.fcall(function () {
      //check if route requires authentication
      if(_.includes(config.AUTH_SCOPE, data.url)){
        
        //check if token has expired
        return dispatch('getTokens').then(function () {
          //make authenticated request
          return axios.post('/api/' + data.url, data.query, {
            headers: {
              Authorization: 'Bearer ' + state.authToken
            }
          }).then(function (data) {
            if(data.data.success === true){
              //request succeeded
              return data.data.response;
            }else{
              //ERROR: request failed
              throw new Error('request failed');
            }
          });
        });

      }else{
        
        //make unauthenticated request
        return axios.post('/api/' + data.url, data.query).then(function (data) {
          if(data.data.success === true){
            //request succeeded
            return data.data.response;
          }else{
            //ERROR: request failed
            throw new Error('request failed');
          }
        });

      }

    });
  },

  //DONE: getTokens
  getTokens({ state, commit, getters, dispatch }, data){
    return q.fcall(function () {
      //verify user is logged in
      if(!getters.loggedIn){
        //ERROR: authentication failed
        dispatch('clearAll');
        throw new Error('authentication failed');
      }

      //check if token expired
      if(Math.floor(Date.now()/1000)+10 >= getters.authTokenInfo.exp){
        //check authLock
        if(state.authLock === true){
          return q.delay(300).then(function () {
            return dispatch('getTokens');
          });
        }

        //set authLock
        commit('setState', {
          authLock: true
        });

        //get new auth token
        return axios.post('/api/newAuthToken', {
          refreshToken: state.refreshToken
        }).then(function (data) {
          if(data.data.success === true){
            //set new tokens, unset authLock
            return dispatch('setTokens', {
              authLock: false,
              authToken: data.data.response.authToken,
              refreshToken: data.data.response.refreshToken
            });
          }else{
            //ERROR: authentication failed
            dispatch('clearAll');
            throw new Error('authentication failed');
          }
        });

      }

    });
  },

  //DONE: setTokens <authToken> <refreshToken> -remember- -authLock-
  setTokens({ state, commit, getters, dispatch }, data){
    return q.fcall(function () {
      //if remember user, store in localstorage
      if(data.remember || (localStorage.getItem('authToken') != null)){
        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }else{
        sessionStorage.setItem('authToken', data.authToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
      }

      //set state
      commit('setState', {
        authLock: data.authLock || false,
        authToken: data.authToken,
        refreshToken: data.refreshToken
      });
    });
  },

  //DONE: clearAll
  clearAll({ state, commit, getters, dispatch }, data){
    return q.fcall(function () {
      //delete stored data and state
      sessionStorage.clear();
      localStorage.clear();
      commit('resetState');
    });
  }
};

module.exports = actions;