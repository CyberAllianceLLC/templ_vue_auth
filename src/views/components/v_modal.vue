<template>
  <div id="v_modal">

    <div @click="$emit('close')" class="modal" tabindex="-1" role="dialog">
      <div @click.stop class="modal-dialog" role="document">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>

  </div>
</template>


<script>
  export default {
    mounted: function (vm = this) {
      //add class to body
      jQuery('body').addClass('modal-open');
    },
    beforeDestroy: function (vm = this) {
      //add class to body
      jQuery('body').removeClass('modal-open');
    },
  }
</script>


<style lang="scss" rel="stylesheet/scss">
  #v_modal {
    .modal {
      display: block;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
