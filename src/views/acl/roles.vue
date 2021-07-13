d<template>
  <div id="dashboard">
    <page-title-bar />
    <div class="row">
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-12 grid-b-space">
        <app-card
          customClasses="grid-b-space"
          :showHeading="true"
        >
          <div slot="card-heading" class="d-flex justify-content-start align-items-center">
            <create-button @onCreate="redirectToCreateRole" />
            <bulk-delete-button class="ml-2" @onDelete="confirmDeleteRole" />
          </div>
          <div class="table-responsive recent-order">
            <table class="table table-striped custom-table">
              <thead>
                <tr>
                  <th>
                    <div class="custom-control custom-checkbox">
                      <input id="__BVID__56" v-model="selectAll" type="checkbox" class="custom-control-input">
                      <label class="custom-control-label" for="__BVID__56" />
                    </div>
                  </th>
                  <th>{{ $t('message.id') }}</th>
                  <th>{{ $t('message.roles') }}</th>
                  <th>{{ $t('message.description') }}</th>
                  <th>{{ $t('message.createdAt') }}</th>
                  <th>{{ $t('message.createdBy') }}</th>
                  <th>{{ $t('message.action') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(role, index) in roles" :key="role.id">
                  <td><b-form-checkbox v-model="ids" :value="role.id" /></td>
                  <td>#{{ index + 1 }}</td>
                  <td>
                    <router-link :to="{name: 'edit-role', params: {id: role.id}}">{{ role.name }}</router-link>
                  </td>
                  <td>{{ role.description }}</td>
                  <td>{{ $dayjs(role.created_at).locale($i18n.locale).format('lll') }}</td>
                  <td>{{ role.created_by.name }}</td>
                  <td class="table-action d-flex">
                    <router-link :to="{name: 'edit-role', params: {id: role.id}}" class="icon-btn text-muted">
                      <i class="zmdi zmdi-edit" />
                    </router-link>
                    <a href="javascript:;" class="icon-btn text-muted" @click="confirmDeleteRole(role)">
                      <i class="zmdi zmdi-delete" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </app-card>
      </div>
    </div>
    <delete-confirmation-dialog
      ref="deleteConfirmationDialog"
      :heading="$t('message.confirmDelete')"
      :message="message"
      @onConfirm="handleDeleteRole"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'roles',
  data() {
    return {
      ids: [],
      message: ''
    }
  },
  computed: {
    ...mapState({
      roles: state => state.acl.roles
    }),
    // select all role checkbox
    selectAll: {
      get: function() {
        return this.roles ? this.ids.length === this.roles.length : false
      },
      set: function(value) {
        const ids = []
        if (value && this.roles) {
          this.roles.forEach(role => { ids.push(role.id) })
        }
        this.ids = ids
      }
    }
  },
  created() {
    this.$store.dispatch('acl/getRoles')
  },
  methods: {
    redirectToCreateRole() {
      this.$router.push({ name: 'create-role' })
    },
    confirmDeleteRole(role) {
      if (role) this.ids = [role.id]
      if (this.ids.length) {
        if (this.ids.length > 1) this.message = this.$t('message.doYouReallyWantToDeleteSelectedRecords')
        else this.message = this.$t('message.doYouReallyWantToDeleteThisRecord')
        this.$refs.deleteConfirmationDialog.openDialog()
      } else {
        this.$notify({
          group: 'notify',
          type: 'warn',
          duration: 5000,
          title: this.$t('message.warning'),
          text: this.$t('message.pleaseSelectAtLeastOneRecordToPerformThisAction')
        })
      }
    },
    handleDeleteRole() {
      const { ids } = this
      if (ids.length) {
        this.$store.dispatch('acl/deleteRole', { ids }).then(response => {
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
