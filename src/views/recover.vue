<template>
  <div id="recover" class="container-fluid">

    <!-- recovery dialog -->
    <div class="row justify-content-center py-5 px-3">
      <div class="card col-md-5 col-xl-3">
        <div class="card-body">

          <!-- header -->
          <h4 class="card-title">Recover Password</h4>
          <hr/>

          <!-- recover form -->
          <form @submit.prevent="sendRecoveryEmail()">
            <!-- email -->
            <div class="form-group position-relative mb-3">
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

            <!-- login button -->
            <button type="submit" class="btn btn-block btn-primary">Send</button>
            <hr class="mb-1 mt-2"/>

            <!-- login or sign up-->
            <div class="text-center text-muted">
              <small>
                <router-link to="/login">Login</router-link>
                |
                <router-link to="/signup">Sign Up</router-link>
              </small>
            </div>
          </form>

        </div>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    data () {
      return {
        email: ''
      }
    },
    methods: {
      sendRecoveryEmail: function (vm = this) {
        if(!vm.errors.has('email')){
          return vm.$store.dispatch('request', {
            url: 'sendRecoveryEmail',
            query: {
              email: vm.email
            }
          }).then(function (data) {
            toastr.success('Recovery email sent');
            vm.email = '';
          }).catch(function (error) {
            toastr.error('Failed to send recovery email');
          });
        }
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss">
  #recover {
    background-color: #e9ecef;
  }
</style>
