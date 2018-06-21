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
            <input v-model="password" v-validate="'required|min:6'" name="password" type="password" placeholder="Password" class="form-control mb-3">

            <!-- confirm password -->
            <input v-model="confirmPassword" v-validate="'required|min:6|confirmed:password'" name="confirm_password" type="password" placeholder="Confirm Password" class="form-control mb-3">

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
        confirmPassword: ''
      }
    },
    methods: {
      verifyRecoveryEmail: function (vm = this) {
        if(vm.password == vm.confirmPassword){
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

        }else{
          toastr.error('Passwords do not match');
          vm.password = '';
          vm.confirmPassword = '';
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