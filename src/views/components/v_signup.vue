<template>
  <div id="v_signup" class="card">
    <div class="card-body">

      <!-- header -->
      <h4 class="card-title">Sign Up</h4>
      <hr/>

      <!-- sign up form -->
      <form @submit.prevent="signup()">
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
            v-validate="'required|min:6'" ref="password"
            name="password" data-vv-as="password"
            :class="{'is-invalid': errors.has('password') && password != ''}"
            class="form-control" type="password" placeholder="Password">
          <div class="invalid-tooltip">
            {{ errors.first('password') }}
          </div>
        </div>

        <!-- confirm password -->
        <div class="form-group position-relative">
          <input
            v-model="confirm_password"
            v-validate="'required|confirmed:password'"
            name="confirm_password" data-vv-as="password"
            :class="{'is-invalid': errors.has('confirm_password') && confirm_password != ''}"
            class="form-control" type="password" placeholder="Confirm Password">
          <div class="invalid-tooltip">
            {{ errors.first('confirm_password') }}
          </div>
        </div>

        <!-- sign up button -->
        <button type="submit" class="btn btn-block btn-primary">Sign Up</button>

        <!-- terms of service and privacy policy -->
        <div class="text-center text-muted">
          <small>By clicking “Sign Up”, you agree to our <a href="#">terms of service</a> and <a href="#">privacy policy</a>.</small>
        </div>
        <hr class="my-1"/>

        <!-- login or forgot password-->
        <div class="text-center text-muted">
          <small>
            <router-link to="/login">Login</router-link>
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
        confirm_password: ''
      }
    },
    methods: {
      signup: function (vm = this) {
        if(!(vm.errors.has('email') || vm.errors.has('password') || vm.errors.has('confirm_password'))){
          return vm.$store.dispatch('request', {
            url: 'newUser',
            query: {
              email: vm.email,
              password: vm.password
            }
          }).then(function (data) {
            //reset form
            vm.email = '';
            vm.password = '';
            vm.confirm_password = '';

            //signed up message
            toastr.success('Signed up! Check your email to verify your account');

            //signed up
            vm.$emit('signedUp');
          }).catch(function (error) {
            toastr.error('User already exists');
          });
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #v_signup {

  }
</style>
