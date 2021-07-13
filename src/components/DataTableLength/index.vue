<template>
  <div class="table-length">
    <b-form-select v-model="selected" :options="options" @change="onChangeDataTableLength" />
  </div>
</template>

<script>
export default {
  name: 'data-table-length',
  props: ['length'],
  data() {
    return {
      selected: this.length || 10,
      options: [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 25, text: '25' },
        { value: 50, text: '50' },
        { value: 100, text: '100' }
      ]
    }
  },
  methods: {
    onChangeDataTableLength(value) {
      this.$emit('onChangeDataTableLength', value)
    }
  }
}
</script>
