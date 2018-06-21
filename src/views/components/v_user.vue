<template>
  <div id="v_user">

    <div class="row">
      <div class="col">
        {{ user.email }}
      </div>
      <div class="col text-sm-right">
        Created {{ momentCreatedAt }}
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        user: {},
      }
    },
    computed: {
      momentCreatedAt: function (vm = this) {
        return moment(vm.user.created_at).fromNow()
      }
    },
    mounted: function (vm = this) {
      return vm.getUserInfo();
    },
    methods: {
      getUserInfo: function (vm = this) {
        return vm.$store.dispatch('request', {
          url: 'getUserInfo',
          query: {}
        }).then(function (data) {
          vm.user = data;
        }).catch(function (error) {
          toastr.error('Failed to get user information');
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #v_user {

  }
</style>
