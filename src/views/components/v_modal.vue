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

<style lang="scss" rel="stylesheet/scss">
  #v_modal {
    .modal {
      display: block;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
