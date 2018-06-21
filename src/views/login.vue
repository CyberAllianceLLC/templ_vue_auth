<template>
  <div id="login" class="container-fluid">

    <!-- login dialog -->
    <div class="row justify-content-center py-5 px-3">
      <div class="col-md-5 col-xl-3">
        <v_login @loggedIn="$router.replace('/dashboard')"></v_login>
      </div>
    </div>

  </div>
</template>


<style lang="scss" rel="stylesheet/scss">
  #login {
    background-color: #e9ecef;
  }
</style>
