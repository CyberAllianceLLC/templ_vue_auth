<template>
  <div id="home">

    <!-- sign up jumbotron -->
    <div class="jumbotron">
      <div class="row justify-content-center">

        <!-- website hook -->
        <div class="col-md-7 col-xl-6">
          <h1 class="big-title">You build it. <br> They come.</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique risus nec feugiat in fermentum. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan.</p>
          <p>
            <a class="btn btn-outline-dark" href="#" role="button">
              <i class="fa fa-lg fa-github"></i> View on Github
            </a>
          </p>
        </div>

        <!-- sign up -->
        <div class="col-md-5 col-xl-3">
          <v_signup @signedUp="$router.replace('/login')"></v_signup>
        </div>

      </div>
    </div>

    <!-- key features -->
    <div class="text-center text-light bg-dark p-3">
      <h2>Key Features</h2>
    </div>

  </div>
</template>


<style lang="scss" rel="stylesheet/scss">
  #home {
    .jumbotron {
      margin-bottom: 0;
      .big-title {
        font-size: 72px;
        font-weight: 300;
      }
    }
  }
</style>
