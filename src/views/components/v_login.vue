<template>
  <div id="v_login" class="card">
    <div class="card-body">

      <!-- header -->
      <h4 class="card-title">Login</h4>
      <hr/>

      <!-- login form -->
      <form @submit.prevent="login()">
        <!-- email -->
        <div class="form-group position-relative">
          <input
            v-model="email"
            v-validate="'required|email'"
            name="email" data-vv-as="email"
            :class="{'is-invalid': errors.has('email') && email != ''}"
            class="form-control" type="email" placeholder="Email">
          <div class="invalid-tooltip">
            {{ errors.first('email') }}
          </div>
        </div>

        <!-- password -->
        <div class="form-group position-relative">
          <input
            v-model="password"
            v-validate="'required|min:6'"
            name="password" data-vv-as="password"
            :class="{'is-invalid': errors.has('password') && password != ''}"
            class="form-control" type="password" placeholder="Password">
          <div class="invalid-tooltip">
            {{ errors.first('password') }}
          </div>
        </div>

        <!-- remember me -->
        <div class="form-group form-check">
          <input v-model="remember" id="agree-terms" type="checkbox" class="form-check-input">
          <label for="agree-terms" class="form-check-label text-muted">
            Remember me
          </label>
        </div>

        <!-- login button -->
        <button type="submit" class="btn btn-block btn-primary">Login</button>
        <hr class="mb-1 mt-2"/>

        <!-- sign up or forgot password-->
        <div class="text-center text-muted">
          <small>
            <router-link to="/signup">Sign Up</router-link>
            |
            <router-link to="/recover">Forgot password?</router-link>
          </small>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        remember: true
      }
    },
    methods: {
      login: function (vm = this) {
        if(!(vm.errors.has('email') || vm.errors.has('password'))){
          return vm.$store.dispatch('request', {
            url: 'loginUser',
            query: {
              email: vm.email,
              password: vm.password
            }
          }).then(function (data) {
            //success, set tokens
            return vm.$store.dispatch('setTokens', {
              authToken: data.authToken,
              refreshToken: data.refreshToken,
              remember: vm.remember
            }).then(function (data) {
              //logged in
              vm.$emit('loggedIn');
            });

          }).catch(function (error) {
            //login failed
            vm.password = '';
            toastr.error('Failed to login');
          });
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #v_login {

  }
</style>
