<template>
  <div class="input data">
    <multiselect
      v-model="selected"
      label="name"
      track-by="id"
      :placeholder="placeholder"
      open-direction="bottom"
      :options="options"
      :searchable="true"
      :internal-search="true"
      :clear-on-select="true"
      :close-on-select="true"
      :options-limit="300"
      :max-height="600"
      :loading="isLoading"
      :multiple="multiple"
      @search-change="asyncFind"
      @input="onChange"
    >
      <template slot="option" slot-scope="props">
        <img
          v-if="props.option.avatar"
          class="option__image"
          :src="props.option.avatar"
        >
        <template v-if="props.option.avatar">
          <div class="option__desc">
            <span class="option__title">{{ props.option.name }}</span>
            <span v-if="props.option.kana_name"> - </span>
            <span class="option__small">{{ props.option.kana_name }}</span>
          </div>
        </template>
        <template v-else>
          <span class="option__title">{{ props.option.name }}</span>
        </template>
      </template>
    </multiselect>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: false },
    value: { type: Object, default: null }
  },
  data() {
    return {
      isLoading: false,
      selected: this.value
    }
  },
  methods: {
    asyncFind(search) {
      this.isLoading = true
      this.$store.dispatch('users/getUsersForSelectBox', { search, length: 10 }).then(() => {
        this.isLoading = false
      })
    },
    onChange() {
      this.$emit('onChange', this.selected)
    }
  }
}
</script>

<style>
.option__image {
    width: 24px;
    height: 24px;
    border-radius: 3px;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
    float: left;
}

.option__desc {
  margin-left: 30px;
}
</style>
