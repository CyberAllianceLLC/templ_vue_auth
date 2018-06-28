<template>
  <div id="oauth" class="container-fluid">
    <div class="row justify-content-center py-4">

      <!-- login -->
      <div v-if="!$store.getters.loggedIn && !error" class="col-md-5 col-xl-3">
        <v_login></v_login>
      </div>

      <!-- grant access -->
      <div v-if="$store.getters.loggedIn && !error" class="col-md-5 col-xl-3">
        <div class="card">
          <div class="card-body">

            <!-- header -->
            <h4 class="card-title">Grant Access</h4>
            <hr/>

            <!-- app name -->
            <p><strong>{{ name }}</strong> wants to connect to your account?</p>

            <!-- permissions -->
            <p class="mb-0">Permissions:</p>
            <span v-for="permission in scope" class="badge badge-primary mr-1">
              {{ permission }}
            </span>
            <hr/>

            <!-- authorize buttons -->
            <div class="float-right">
              <button type="button" class="btn btn-outline-secondary">Cancel</button>
              <button @click="newVendorAccessToken()" type="button" class="btn btn-primary">Authorize</button>
            </div>

          </div>
        </div>
      </div>

      <!-- error -->
      <div v-if="error" class="col-md-5 col-xl-3">
        <div class="alert alert-danger" role="alert">
          Invalid query parameters
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data: function (vm = this) {
      return {
        error: false,
        name: '',
        client_id: '',
        redirect_uri: '',
        scope: '',
        state: ''
      }
    },
    mounted: function (vm = this) {
      return q.fcall(function () {
        //get name based on web or app redirect
        var redirectUri = new urijs(vm.$route.query.redirect_uri);
        if(redirectUri.protocol() === 'https' || redirectUri.protocol() === 'http'){
          vm.name = redirectUri.domain();
        }else{
          vm.name = redirectUri.protocol();
        }

        //set values
        vm.client_id = vm.$route.query.client_id;
        vm.redirect_uri = vm.$route.query.redirect_uri;
        vm.scope = _.intersection(config.VENDOR_SCOPE, _.split(vm.$route.query.scope, ','));
        vm.state = vm.$route.query.state;

        //validate data
        if(!(vm.name && vm.client_id && vm.redirect_uri && vm.scope.length > 0 && vm.state)) throw 'invalid query parameters';
      }).catch(function (error) {
        vm.error = true;
      });
    },
    methods: {
      newVendorAccessToken: function (vm = this) {
        return vm.$store.dispatch('request', {
          url: 'newVendorAccessToken',
          query: {
            holder: vm.client_id,
            redirect_uri: vm.redirect_uri,
            scope: vm.scope
          }
        }).then(function (data) {
          var redirectUri = new urijs(vm.redirect_uri).fragment('').removeSearch(['accessToken', 'state']);
          redirectUri.addSearch({
            accessToken: data.accessToken,
            state : vm.state
          });
          window.location.replace(redirectUri.toString());
        }).catch(function (error) {
          toastr.error('Failed to authorize');
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #oauth {
    background-color: #e9ecef;
  }
</style>