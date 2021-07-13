<template>
  <div class="user-list-wrapper">
    <div class="row">
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-12 grid-b-space">
        <app-card customClasses="grid-b-space" :showFooter="users.data" :showHeading="true">
          <div slot="card-heading" class="d-flex justify-content-start align-items-center">
            <create-button @onCreate="openDialog" />
            <import-button class="ml-2" @onImport="openUserImportForm" />
            <search-box class="ml-5" :search="search" @onSearch="handleSearchUser" />
          </div>
          <grid-view :users="users.data" @onEdit="openDialog" @onDelete="showDeleteConfirmation" />
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
      </div>
    </div>
    <user-form ref="userForm" />
    <user-import-form ref="userImportForm" />
    <delete-confirmation-dialog
      ref="deleteConfirmationDialog"
      :heading="$t('message.confirmDelete')"
      :message="message"
      @onConfirm="handleDeleteTask"
    />
  </div>
</template>

<script>
import GridView from './grid-view'
import UserForm from './components/UserForm'
import UserImportForm from './components/UserImportForm'
import { mapGetters } from 'vuex'
export default {
  name: 'users',
  components: {
    GridView,
    UserForm,
    UserImportForm
  },
  data() {
    return {
      search: '',
      length: 12,
      page: 1, // current page
      message: '',
      ids: []
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  created() {
    Promise.all([
      this.$store.dispatch('users/getAllUsers', { length: this.length }),
      this.$store.dispatch('acl/getRolesForSelectBox'),
      this.$store.dispatch('departments/getDepartmentForSelectBox')
    ])
  },
  methods: {
    openDialog(user) {
      if (user) {
        this.$refs.userForm.editingUser(user)
      }
      this.$refs.userForm.openDialog()
    },
    openUserImportForm(user) {
      this.$refs.userImportForm.openDialog()
    },
    onPageChanged(page) {
      const { search, length } = this
      this.page = page
      this.$store.dispatch('users/getAllUsers', { page, search, length })
    },
    handleSearchUser(search) {
      const { length } = this
      this.search = search
      this.page = 1
      this.$store.dispatch('users/getAllUsers', { search, length })
    },
    showDeleteConfirmation(user) {
      if (user) {
        this.ids = [user.id]
        this.message = this.$t('message.doYouReallyWantToDeleteThisRecord')
        this.$refs.deleteConfirmationDialog.openDialog()
      }
    },
    handleDeleteTask() {
      const { ids } = this
      if (ids.length) {
        this.$store.dispatch('users/softDeleteUser', { ids }).then(response => {
          this.$refs.deleteConfirmationDialog.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.success'),
            text: this.$t('message.deletedSuccessfully')
          })
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.paginate {
  width: 100%;
}
</style>
