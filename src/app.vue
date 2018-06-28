<template>
  <div>
    <!-- topbar -->
    <nav id="topbar" class="navbar navbar-expand-md navbar-light bg-white py-3">
      <!-- brand -->
      <router-link to="/" class="navbar-brand">Cyber Alliance Template</router-link>

      <!-- links -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#topbar-collapse" aria-controls="topbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="topbar-collapse">
        <ul class="navbar-nav ml-auto mr-3">
          <li class="nav-item">
            <a class="nav-link" href="#">Link 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link 2</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link 3</a>
          </li>
        </ul>

        <!-- logged out -->
        <router-link to="/login" v-show="!$store.getters.loggedIn" class="btn btn-outline-primary mr-1">Login</router-link>
        <router-link to="/signup" v-show="!$store.getters.loggedIn" class="btn btn-primary">Sign Up</router-link>

        <!-- logged in -->
        <button @click="logout()" v-show="$store.getters.loggedIn" class="btn btn-primary">Logout</button>
      </div>
    </nav>

    <!-- main content -->
    <div id="main-content">
      <router-view :key="$route.fullPath"></router-view>
    </div>

    <!-- footer -->
    <footer id="footer" class="pt-4 mb-md-4 pt-md-5 text-center">
      <p>
        Copyright © {{ new Date().getFullYear() }}, Cyber Alliance, LLC. All Rights Reserved.
      </p>
      <p>
        <a class="icon" href="#">
          <i class="fa fa-2x fa-github"></i>
        </a>
      </p>
    </footer>

  </div>
</template>

<script>
  export default {
    methods: {
      logout: function (vm = this) {
        //delete old token
        vm.$store.dispatch('request', {
          url: 'deleteTokens',
          query: {
            token_id: [vm.$store.getters.authTokenInfo.token_id]
          }
        });

        //clear storage
        vm.$store.dispatch('clearAll').then(function (data) {
          //redirect to home
          router.replace('/');
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  //==== Bootstrap ====
  @import "../node_modules/bootstrap/scss/bootstrap.scss";

  //==== Font Awesome ====
  $fa-font-path: "/fonts/";
  @import "../node_modules/font-awesome/scss/font-awesome.scss";

  //==== Nprogress ====
  @use "../node_modules/nprogress/nprogress";

  //==== Toastr ====
  @import "../node_modules/toastr/toastr.scss";

  //==== Global Styles ====
  //topbar
  #topbar {
    border-bottom: 1px solid #e5e5e5;
    box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
  }

  //main content
  #main-content {

  }

  //footer
  #footer {
    border-top: 1px solid #e5e5e5;
    .icon {
      color:inherit;
    }
  }

  //other global styles
  html {
    font-size: 14px;
  }
  @media (min-width: 768px) {
    html {
      font-size: 16px;
    }
  }
  a {
    cursor: pointer;
  }

</style>
