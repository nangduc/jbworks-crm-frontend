<template>
  <button type="button" class="btn btn-sm d-inline-flex text-capitalize btn-danger" @click="onDelete">
    <i class="material-icons btn-icon">delete</i>{{ $t('message.delete') }}
  </button>
</template>

<script>
export default {
  methods: {
    onDelete() {
      this.$emit('onDelete')
    }
  }
}
</script>
