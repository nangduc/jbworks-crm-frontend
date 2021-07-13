<template>
  <div class="custom-search d-flex align-items-center border">
    <input type="text" class="searchIn-inbox form-control border-0" :value="search" :placeholder="$t('message.search')" @keyup.enter="onSearch">
    <span class="w-10 text-center">
      <i class="zmdi zmdi-search" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'search-box',
  props: ['search'],
  methods: {
    onSearch(e) {
      const search = e.target.value
      this.$emit('onSearch', search)
    }
  }
}
</script>

