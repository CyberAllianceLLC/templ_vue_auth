<template>
  <div id="dashboard" class="container-fluid">

    <!-- dashboard -->
    <div class="row justify-content-center py-5">
      <div class="col-sm-9 col-lg-7 col-xl-6">
        <div class="card">
          <div class="card-body">
            <!-- title -->
            <h4 class="card-title">Dashboard</h4>

            <!-- user info -->
            <v_accordion>
              <template slot="title">
                <i class="fa fa-user-circle-o"></i> User Info
              </template>
              <template slot="content">
                <v_user></v_user>
              </template>
            </v_accordion>

            <!-- settings -->
            <v_accordion>
              <template slot="title">
                <i class="fa fa-wrench"></i> Settings
              </template>
              <template slot="content">
                <v_settings></v_settings>
              </template>
            </v_accordion>

            <!-- access management -->
            <v_accordion>
              <template slot="title">
                <i class="fa fa-cubes"></i> Access Management
              </template>
              <template slot="content">
                <v_accessManage></v_accessManage>
              </template>
            </v_accordion>

            <!-- api keys -->
            <v_accordion>
              <template slot="title">
                <i class="fa fa-code"></i> API Keys
              </template>
              <template slot="content">
                <v_apiManage></v_apiManage>
              </template>
            </v_accordion>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  #dashboard {
    background-color: #e9ecef;
  }
</style>