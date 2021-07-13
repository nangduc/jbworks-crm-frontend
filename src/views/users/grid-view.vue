<template>
  <user-grid :users="users" @onEdit="onEdit" @onDelete="onDelete" />
</template>

<script>
import UserGrid from 'Components/Widgets/UserGrid'
export default {
  components: {
    UserGrid
  },
  props: {
    users: { type: Array, required: true, default: () => [] }
  },
  methods: {
    onEdit(user) {
      this.$emit('onEdit', user)
    },
    onDelete(user) {
      this.$emit('onDelete', user)
    }
  }
}
</script>

<style>

</style>
