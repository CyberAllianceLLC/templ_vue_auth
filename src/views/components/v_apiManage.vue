<template>
  <div id="v_apiManage">
    <div class="row">

      <!-- new api key -->
      <div class="col-md-6 mb-3 mb-md-0">
        <!-- title -->
        <h4>New API Key</h4>
        <hr/>

        <!-- scope -->
        <form @submit.prevent="newApiKey()">
          <!-- name -->
          <div class="form-group position-relative">
            <input
              v-model="newApiKeyName"
              v-validate="'required|min:3'"
              name="newApiKeyName" data-vv-as="name"
              :class="{'is-invalid': errors.has('newApiKeyName') && newApiKeyName != ''}"
              class="form-control" type="text" placeholder="Name">
            <div class="invalid-tooltip">
              {{ errors.first('newApiKeyName') }}
            </div>
          </div>

          <!-- permissions -->
          <div class="card">
            <div class="card-header">
              Permissions
              <a @click="selectAllPermissions()" class="float-right">
                <i v-show="!selectAll" class="fa fa-square-o"></i>
                <i v-show="selectAll" class="fa fa-check-square-o"></i>
              </a>
            </div>
            <ul class="list-group list-group-flush permissions">
              <li v-for="permission in newApiKeyScope" @click="permission.selected = !permission.selected" class="list-group-item">
                <i v-show="!permission.selected" class="fa fa-square-o"></i>
                <i v-show="permission.selected" class="fa fa-check-square-o"></i>
                {{ permission.permission }}
              </li>
            </ul>
          </div>
          <br/>

          <!-- submit -->
          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>

      <!-- api keys -->
      <div class="col-md-6">
        <!-- title -->
        <h4>API Keys</h4>
        <hr/>

        <!-- keys -->
        <v_token
          v-for="token in apiKeys"
          :key="token.token_id"
          :token="token"
          @reRender="getUserTokenInfo()"></v_token>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        tokens: [],
        newApiKeyName: '',
        selectAll: false,
        newApiKeyScope: _.map(config.API_SCOPE, function(permission) {
          return {
            selected: false,
            permission: permission
          }
        })
      }
    },
    computed: {
      apiKeys: function (vm = this) {
        return _.filter(vm.tokens, { type: 'api' });
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
      },
      selectAllPermissions: function (vm = this) {
        vm.newApiKeyScope = _.map(vm.newApiKeyScope, function(permission) {
          permission.selected = !vm.selectAll;
          return permission;
        });
        vm.selectAll = !vm.selectAll;
      },
      newApiKey: function (vm = this) {
        if(!vm.errors.has('newApiKeyName')){
          var scope = _.map(_.filter(vm.newApiKeyScope, { 'selected': true }), 'permission');
          return vm.$store.dispatch('request', {
            url: 'newApiToken',
            query: {
              name: vm.newApiKeyName,
              scope: scope
            }
          }).then(function (data) {
            toastr.success('API key created');
            vm.newApiKeyName = '';
            vm.selectAll = false;
            vm.newApiKeyScope = _.map(vm.newApiKeyScope, function(permission) {
              permission.selected = false;
              return permission;
            });
            vm.getUserTokenInfo();
          }).catch(function (error) {
            toastr.error('Failed to create API key');
          });
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #v_apiManage {
    .permissions {
      max-height: 250px;
      overflow-y: auto;
    }
  }
</style>
