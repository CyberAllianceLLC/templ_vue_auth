<template>
  <div id="v_token" class="card">
    <!-- token title -->
    <div class="card-header">
      <!-- title -->
      <div>
        <!-- dropdown icon -->
        <a v-show="!detailsOpen"><i class="fa fa-angle-right"></i></a>
        <a v-show="detailsOpen"><i class="fa fa-angle-down"></i></a>

        <!-- name -->
        <a @click="toggleDetails()">{{ token.name }}</a>
        <span v-show="token.token_id == $store.getters.authTokenInfo.token_id" class="text-info">(current session)</span>

        <!-- delete icon -->
        <a @click="deleteTokens()" v-show="token.token_id != $store.getters.authTokenInfo.token_id" class="float-right">
          <i class="fa fa-trash-o text-danger"></i>
        </a>
      </div>

    </div>

    <!-- token details-->
    <div v-show="detailsOpen" class="card-body">
      <div class="row">
        <div class="col">
          <strong><u>Owner</u></strong> <br/>
          {{ token.user_id }} <br/>
          <strong><u>Created</u></strong> <br/>
          {{ createdAt }} <br/>
        </div>
        <div class="col">
          <strong><u>Holder</u></strong> <br/>
          {{ token.holder }} <br/>
          <strong><u>Expires</u></strong> <br/>
          {{ expiresAt }} <br/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <strong><u>Permissions</u></strong> <br/>
          <span v-for="permission in token.scope" class="badge badge-primary mr-1">
              {{ permission }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      token: Object
    },
    data: function () {
      return {
        detailsOpen: false
      }
    },
    computed: {
      createdAt: function (vm = this) {
        return moment(vm.token.created_at).fromNow();
      },
      expiresAt: function (vm = this) {
        return moment(vm.token.expires).fromNow();
      }
    },
    methods: {
      toggleDetails: function (vm = this) {
        vm.detailsOpen = !vm.detailsOpen;
      },
      deleteTokens: function (vm = this) {
        return vm.$store.dispatch('request', {
          url: 'deleteTokens',
          query: {
            token_id: [vm.token.token_id]
          }
        }).then(function (data) {
          toastr.success('Token deleted');
          vm.$emit('reRender');
        }).catch(function (error) {
          toastr.error('Failed to delete token');
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #v_token {

  }
</style>