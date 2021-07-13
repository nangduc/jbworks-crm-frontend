<template>
  <button type="button" class="btn btn-sm d-inline-flex text-capitalize btn-success" @click="onImport">
    <i class="material-icons btn-icon">import_export</i>{{ $t('message.import') }}
  </button>
</template>

<script>
export default {
  methods: {
    onImport() {
      this.$emit('onImport')
    }
  }
}
</script>

<style>

</style>
