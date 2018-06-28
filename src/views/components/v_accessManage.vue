<template>
  <div id="v_accessManage">

    <!-- browser sessions -->
    <v_accordion>
      <template slot="title">
        Browser Sessions
      </template>
      <template slot="content">
        <v_token
          v-for="token in sessionKeys"
          :key="token.token_id"
          :token="token"
          @reRender="getUserTokenInfo()"></v_token>
      </template>
    </v_accordion>

    <!-- api keys -->
    <v_accordion>
      <template slot="title">
        API Keys
      </template>
      <template slot="content">
        <v_token
          v-for="token in apiKeys"
          :key="token.token_id"
          :token="token"
          @reRender="getUserTokenInfo()"></v_token>
      </template>
    </v_accordion>

    <!-- connected apps -->
    <v_accordion>
      <template slot="title">
        Connected Apps
      </template>
      <template slot="content">
        <v_token
          v-for="token in appKeys"
          :key="token.token_id"
          :token="token"
          @reRender="getUserTokenInfo()"></v_token>
      </template>
    </v_accordion>

    <!-- connected clients -->
    <v_accordion>
      <template slot="title">
        Connected Clients
      </template>
      <template slot="content">
        <v_token
          v-for="token in clientKeys"
          :key="token.token_id"
          :token="token"
          @reRender="getUserTokenInfo()"></v_token>
      </template>
    </v_accordion>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        tokens: []
      }
    },
    computed: {
      sessionKeys: function (vm = this) {
        return _.filter(vm.tokens, function(o) { return o.user_id === o.holder && o.type === 'refresh'; });
      },
      apiKeys: function (vm = this) {
        return _.filter(vm.tokens, { type: 'api' });
      },
      appKeys: function (vm = this) {
        return _.filter(vm.tokens, function(o) { return o.user_id !== o.holder && o.type === 'refresh' && o.user_id === vm.$store.getters.authTokenInfo.user_id; });
      },
      clientKeys: function (vm = this) {
        return _.filter(vm.tokens, function(o) { return o.user_id !== o.holder && o.type === 'refresh' && o.holder === vm.$store.getters.authTokenInfo.user_id; });
      }
    },
    mounted: function (vm = this) {
      return vm.getUserTokenInfo();
    },
    methods: {
      getUserTokenInfo: function (vm = this) {
        return vm.$store.dispatch('request', {
          url: 'getUserTokenInfo',
          query: {}
        }).then(function (data) {
          vm.tokens = data;
        }).catch(function (error) {
          toastr.error('Failed to get user access tokens');
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #v_accessManage {

  }
</style>
