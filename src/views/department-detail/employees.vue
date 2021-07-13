<template>
  <app-card customClasses="grid-b-space" :showFooter="users.data" :showHeading="true">
    <div slot="card-heading" class="d-flex justify-content-start align-items-center">
      <search-box :search="search" @onSearch="handleSearchUser" />
    </div>
    <user-grid v-if="users.data" :users="users.data" />
    <div slot="card-footer" class="d-flex justify-content-between">
      <pagination
        v-if="users.meta && users.meta.last_page > 1"
        :totalRow="users.meta.total"
        :perPage="users.meta.per_page"
        :page="page"
        @onChangePage="onPageChanged"
      />
    </div>
  </app-card>
</template>

<script>
import UserGrid from 'Components/Widgets/UserGrid'
import { mapGetters } from 'vuex'
export default {
  components: {
    UserGrid
  },
  data() {
    return {
      departmentId: this.$route.params.id,
      search: '',
      length: 12,
      page: 1 // current page
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  created() {
    const { departmentId, length } = this
    this.$store.dispatch('users/getUsersByDepartmentId', { departmentId, length })
  },
  methods: {
    onPageChanged(page) {
      const { departmentId, search, length } = this
      this.page = page
      this.$store.dispatch('users/getUsersByDepartmentId', { departmentId, page, search, length })
    },
    handleSearchUser(search) {
      const { departmentId, length } = this
      this.search = search
      this.page = 1
      this.$store.dispatch('users/getUsersByDepartmentId', { departmentId, search, length })
    }
  }
}
</script>
