<template>
  <button type="button" class="btn btn-sm d-inline-flex text-capitalize btn-primary" @click="onCreate">
    <i class="material-icons btn-icon">add_circle</i>{{ $t('message.create') }}
  </button>
</template>

<script>
export default {
  methods: {
    onCreate() {
      this.$emit('onCreate')
    }
  }
}
</script>

<style>

</style>
