<template>
  <div id="signup" class="container-fluid">

    <!-- signup dialog -->
    <div class="row justify-content-center py-5 px-3">
      <div class="col-md-5 col-xl-3">
        <v_signup @signedUp="$router.replace('/login')"></v_signup>
      </div>
    </div>

  </div>
</template>


<style lang="scss" rel="stylesheet/scss">
  #signup {
    background-color: #e9ecef;
  }
</style>
