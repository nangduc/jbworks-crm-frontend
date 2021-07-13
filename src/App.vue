<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
    <notifications group="notify" position="top center" animation-type="velocity" />
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    layout() {
      return this.$route.meta.layout || 'div'
    }
  }
}
</script>

<style lang="scss">
.vue-notification-group {
  z-index: 9999999 !important;
}

.vue-treeselect.is-invalid {
  .vue-treeselect__control {
    border-color: #FF3739 !important;
  }
}

.vue-treeselect.is-invalid ~ .invalid-feedback{
  display: block !important;
}
img {
  object-fit: cover;
  object-position: center;
}
.sidebar-panel-wrap {
  height: 100%;
  .sidebar-panel {
  height:100%;
  }
}

</style>
