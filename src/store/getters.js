var jwt = require('jsonwebtoken');

//===== GETTERS =====
var getters = {
  loggedIn(state, getters){
    return state.authToken != '';
  },
  authTokenInfo(state, getters){
    return jwt.decode(state.authToken);
  },
  refreshTokenInfo(state, getters){
    return jwt.decode(state.refreshToken);
  }
};

module.exports = getters;