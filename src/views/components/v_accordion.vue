<template>
  <div id="v_accordion" class="card">
    <!-- token title -->
    <div @click="active = !active" class="card-header">
      <!-- title -->
      <slot name="title"></slot>
    </div>

    <!-- details -->
    <transition name="slide-fade">
      <div v-if="active" class="card-body">
        <slot name="content"></slot>
      </div>
    </transition>

  </div>
</template>

<script>
  export default {
    data: function (vm = this) {
      return {
        active: false
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #v_accordion {

    //transition
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(10px);
      opacity: 0;
    }
  }
</style>