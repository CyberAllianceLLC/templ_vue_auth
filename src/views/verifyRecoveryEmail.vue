<template>
  <div id="verifyRecoveryEmail" class="container-fluid">

    <!-- recovery dialog -->
    <div class="row justify-content-center py-5 px-3">
      <div class="card col-md-5 col-xl-3">
        <div class="card-body">

          <!-- header -->
          <h4 class="card-title">New password</h4>
          <hr/>

          <!-- recover form -->
          <form @submit.prevent="verifyRecoveryEmail()">

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

            <!-- update button -->
            <button type="submit" class="btn btn-block btn-primary">Update</button>

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
        password: '',
        confirm_password: ''
      }
    },
    methods: {
      verifyRecoveryEmail: function (vm = this) {
        if(!(vm.errors.has('password') || vm.errors.has('confirm_password'))){
          return vm.$store.dispatch('request', {
            url: 'verifyRecoveryEmail',
            query: {
              user_id: vm.$route.params.user_id,
              new_password: vm.password,
              recovery_key: vm.$route.params.recovery_key
            }
          }).then(function (data) {
            toastr.success('Password updated');
            return vm.$store.dispatch('clearAll').then(function (data) {
              router.replace('/login');
            });
          }).catch(function (error) {
            toastr.error('Failed to update password');
            vm.password = '';
            vm.confirmPassword = '';
          });
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #verifyRecoveryEmail {
    background-color: #e9ecef;
  }
</style>