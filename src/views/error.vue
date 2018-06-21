<template>
  <div id="error" class="container-fluid">

    <!-- error message -->
    <div class="row justify-content-center py-5 px-3">
      <div class="card col-md-5">
        <div class="card-body text-center">

          <!-- error -->
          <h1>Error 404</h1>
          <i class="fa fa-ban" aria-hidden="true"></i>
          <h1>Page Not Found</h1>

        </div>
      </div>
    </div>

  </div>
</template>



<style lang="scss" rel="stylesheet/scss">
  #error {
    background-color: #e9ecef;
    i {
      color: red;
      font-size:280px;
    }
  }
</style>