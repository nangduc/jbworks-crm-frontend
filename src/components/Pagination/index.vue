<template>
  <div class="paginate">
    <b-pagination
      v-model="page"
      size="sm"
      align="right"
      :total-rows="totalRow"
      :per-page="perPage"
      :hide-goto-end-buttons="true"
      first-number
      last-number
      @change="onChangePage"
    />
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['totalRow', 'perPage', 'page'],
  methods: {
    onChangePage(page) {
      this.$emit('onChangePage', page)
    }
  }
}
</script>
