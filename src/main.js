global.q = require('q');
global.jQuery = require('jquery');
global.toastr = require('toastr');
global.nprogress = require('nprogress');
global._ = require('lodash');
global.moment = require('moment');
global.urijs = require('urijs');
require('bootstrap');

global.config = require('../config.js');
var Vue = require('vue');
var VueRouter = require('vue-router');
var VeeValidate = require('vee-validate');
var App = Vue.extend(require('./app.vue'));
var store = require('./store/index.js');

//toastr options
global.toastr.options = {
  positionClass: 'toast-bottom-right'
};

//nprogress options
global.nprogress.configure({
  showSpinner: false
});

//vue init
Vue.use(VueRouter);
Vue.use(VeeValidate);


//global components
Vue.component('v_accordion', require('./views/components/v_accordion.vue'));
Vue.component('v_modal', require('./views/components/v_modal.vue'));
Vue.component('v_signup', require('./views/components/v_signup.vue'));
Vue.component('v_login', require('./views/components/v_login.vue'));
Vue.component('v_user', require('./views/components/v_user.vue'));
Vue.component('v_settings', require('./views/components/v_settings.vue'));
Vue.component('v_accessManage', require('./views/components/v_accessManage.vue'));
Vue.component('v_apiManage', require('./views/components/v_apiManage.vue'));
Vue.component('v_token', require('./views/components/v_token.vue'));

//routes
var routes = [
  {
    name: 'home',
    path: '/',
    component: require('./views/home.vue'),
    meta: {
      auth: false
    }
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: require('./views/dashboard.vue'),
    meta: {
      auth: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: require('./views/login.vue'),
    meta: {
      auth: false
    }
  },
  {
    name: 'signup',
    path: '/signup',
    component: require('./views/signup.vue'),
    meta: {
      auth: false
    }
  },
  {
    name: 'verifyNewEmail',
    path: '/verifyNewEmail/:user_id/:recovery_key/:new_email',
    component: require('./views/verifyNewEmail.vue')
  },
  {
    name: 'recover',
    path: '/recover',
    component: require('./views/recover.vue'),
    meta: {
      auth: false
    }
  },
  {
    name: 'verifyRecoveryEmail',
    path: '/verifyRecoveryEmail/:user_id/:recovery_key',
    component: require('./views/verifyRecoveryEmail.vue')
  },
  {
    name: 'oauth',
    path: '/oauth',
    component: require('./views/oauth.vue')
  },
  {
    path: '*',
    component: require('./views/error.vue')
  }
];

//init router
global.router = new VueRouter({
  routes: routes,
  //mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    }else{
      return { x: 0, y: 0 }
    }
  }
});

//before each route change
router.beforeEach(function(to, from, next) {
  //check if user is authenticated
  if(to.meta.auth === true && store.getters.loggedIn === false){
    //redirect to login
    next('/login');

  }else if(to.meta.auth === false && store.getters.loggedIn === true){
    //redirect to dashboard
    next('/dashboard');

  }else{
    //start loading bar
    nprogress.start();

    //continue
    next();
  }

});

//after each route change
router.afterEach(function(to, from) {
  //stop loading bar
  nprogress.done();
});


//start app
new App({
  store: store,
  router: router
}).$mount('#app');
