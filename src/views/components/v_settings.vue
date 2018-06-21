<template>
  <div id="v_settings">

    <!-- change email -->
    <h4>Change Email</h4>
    <form @submit.prevent="newEmail()">
      <!-- new email -->
      <div class="form-group position-relative">
        <input
          v-model="new_email"
          v-validate="'required|email'"
          name="new_email" data-vv-as="email"
          :class="{'is-invalid': errors.has('new_email') && new_email != ''}"
          class="form-control" type="email" placeholder="New Email">
        <div class="invalid-tooltip">
          {{ errors.first('new_email') }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Change Email</button>
    </form>
    <hr/>

    <!-- change password -->
    <h4>Change Password</h4>
    <form @submit.prevent="newPassword()">
      <!-- current password -->
      <div class="form-group position-relative">
        <input
          v-model="current_password"
          v-validate="'required|min:6'"
          name="current_password" data-vv-as="current password"
          :class="{'is-invalid': errors.has('current_password') && current_password != ''}"
          class="form-control" type="password" placeholder="Current Password">
        <div class="invalid-tooltip">
          {{ errors.first('current_password') }}
        </div>
      </div>
      <!-- new password -->
      <div class="form-group position-relative">
        <input
          v-model="new_password"
          v-validate="'required|min:6'" ref="new_password"
          name="new_password" data-vv-as="new password"
          :class="{'is-invalid': errors.has('new_password') && new_password != ''}"
          class="form-control" type="password" placeholder="New Password">
        <div class="invalid-tooltip">
          {{ errors.first('new_password') }}
        </div>
      </div>
      <!-- confirm new password -->
      <div class="form-group position-relative">
        <input
          v-model="confirm_new_password"
          v-validate="'required|confirmed:new_password'"
          name="confirm_new_password" data-vv-as="confirmed password"
          :class="{'is-invalid': errors.has('confirm_new_password') && confirm_new_password != ''}"
          class="form-control" type="password" placeholder="Confirm New Password">
        <div class="invalid-tooltip">
          {{ errors.first('confirm_new_password') }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Change Password</button>
    </form>
    <hr/>

    <!-- delete account -->
    <h4>Delete Account</h4>
    <form @submit.prevent="deleteUser()">
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
      <button type="submit" class="btn btn-danger">Delete Account</button>
    </form>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        new_email: '',
        current_password: '',
        new_password: '',
        confirm_new_password: '',
        password: ''
      }
    },
    methods: {
      newEmail: function (vm = this) {
        if(!vm.errors.has('new_email')){
          return vm.$store.dispatch('request', {
            url: 'newEmail',
            query: {
              email: vm.new_email
            }
          }).then(function (data) {
            toastr.success('Verification email sent');
          }).catch(function (error) {
            toastr.error('Failed to update email');
          });
        }
      },
      newPassword: function (vm = this) {
        if(!(vm.errors.has('current_password') || vm.errors.has('new_password') || vm.errors.has('confirm_new_password'))){
          return vm.$store.dispatch('request', {
            url: 'newPassword',
            query: {
              password: vm.current_password,
              new_password: vm.new_password
            }
          }).then(function (data) {
            toastr.success('Password updated');
            return vm.$store.dispatch('clearAll').then(function (data) {
              router.replace('/login');
            });
          }).catch(function (error) {
            toastr.error('Failed to change password. Make sure your password is correct');
            vm.current_password = '';
            vm.new_password = '';
            vm.confirm_new_password = '';
          });
        }
      },
      deleteUser: function (vm = this) {
        if(!vm.errors.has('password')){
          return vm.$store.dispatch('request', {
            url: 'deleteUser',
            query: {
              password: vm.password
            }
          }).then(function (data) {
            toastr.success('Account deleted');
            vm.password = '';
            return vm.$store.dispatch('clearAll').then(function (data) {
              router.replace('/login');
            });
          }).catch(function (error) {
            toastr.error('Failed to delete account. Make sure your password is correct');
            vm.password = '';
          });
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #v_settings {

  }
</style>
