<template>
  <div class="delete-confirmation-dialog">
    <b-modal v-model="open" max-width="500" hide-footer :title="heading">
      <div class="d-block py-4 text-center">
        <h4>{{ message }}</h4>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <b-btn class="mr-3 mb-3 px-3 text-capitalize" variant="secondary" size="sm" @click="open = false">{{ $t('message.cancel') }}
        </b-btn>
        <b-btn class="mb-3 px-3 text-capitalize" variant="danger" size="sm" @click="$emit('onConfirm')">{{ $t('message.yes') }}</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['heading', 'message', 'onConfirm'],
  data() {
    return {
      open: false
    }
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
    }
  }
}
</script>
