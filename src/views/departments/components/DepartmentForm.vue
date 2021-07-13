<template>
  <div class="department-form">
    <b-modal v-model="open" size="md" hide-footer centered :title="isEditing ? $t('message.editDepartment') : $t('message.createNewDepartment')" @hide="closeDialog">
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <b-form-group :label="$t('message.departmentName')">
            <b-form-input v-model="data.name" :placeholder="$t('message.departmentName')" />
          </b-form-group>
          <b-form-group :label="$t('message.department')">
            <treeselect
              v-model="data.parent_id"
              :multiple="false"
              :options="departments.data"
              :normalizer="normalizer"
              :placeholder="$t('message.department')"
            />
          </b-form-group>
          <b-form-group :label="$t('message.departmentManager')">
            <user-select-box
              :value="manager"
              :options="users.data"
              :placeholder="$t('message.departmentManager')"
              @onChange="onChangeUserSelectBox"
            />
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button class="mt-3 text-capitalize mx-2" size="sm" @click="closeDialog">
              {{ $t('message.cancel') }}
            </b-button>
            <b-btn
              type="submit"
              class="mt-3 text-capitalize mx-2 px-4"
              variant="danger"
              size="sm"
            >
              {{ $t('message.save') }}
            </b-btn>
          </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import UserSelectBox from 'Components/Widgets/UserSelectBox'
import { mapGetters } from 'vuex'
export default {
  components: {
    UserSelectBox
  },
  props: {
    departments: { type: Object, required: true }
  },
  data() {
    return {
      open: false,
      isEditing: false,
      data: {
        id: '',
        name: '',
        parent_id: null,
        manager_id: null
      },
      manager: null,
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/usersSelectBox'
    })
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.isEditing = false
      // Object.keys(this.data).forEach(key => {
      //   this.data[key] = null
      // })
    },
    onChangeUserSelectBox(user) {
      this.data.manager_id = user.id
    },
    onSave() {
      if (!this.isEditing) {
        this.handleCreateDepartment()
      } else {
        this.handleUpdateDepartment()
      }
    },
    handleCreateDepartment() {
      const { data } = this
      this.$store.dispatch('departments/createDepartment', data)
        .then(response => {
          this.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.createdSuccessfully')
          })
        }).catch(error => {
          if (error.status === 422) {
            this.errors = error.data.errors
          }
        })
    },
    editingDepartment(department) {
      console.log('edit', department)
      this.manager = department.manager
      this.isEditing = true
      Object.keys(this.data).forEach(key => {
        this.data[key] = department[key]
      })
    },
    handleUpdateDepartment() {
      const { data } = this
      if (!data.parent_id) data.parent_id = null
      console.log('data1', data)
      this.$store.dispatch('departments/updateDepartment', data)
        .then(response => {
          this.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.createdSuccessfully')
          })
        }).catch(error => {
          if (error.status === 422) {
            this.errors = error.data.errors
          }
        })
    }
  }
}
</script>
