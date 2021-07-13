<template>
  <div class="user-form">
    <b-modal v-model="open" size="lg" hide-footer centered :title="isEditing ? $t('message.editUser') : $t('message.createNewUser')" @hide="closeDialog">
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.fullName')">
            <b-form-input v-model="data.name" :class="{'is-invalid': errors.name }" :placeholder="$t('message.fullName')" />
            <b-form-invalid-feedback v-for="(error, i) in errors.name" :key="i">
              {{ errors.name[i] }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.kanaName')">
            <b-form-input v-model="data.kana_name" :placeholder="$t('message.kanaName')" />
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.username')">
            <b-form-input v-model="data.username" :class="{'is-invalid': errors.name }" :placeholder="$t('message.username')" />
            <b-form-invalid-feedback v-for="(error, i) in errors.username" :key="i">
              {{ errors.username[i] }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.birthday')">
            <v-date-picker v-model="data.birthday" :locale="$i18n.locale">
              <template v-slot="{ inputValue, inputEvents }">
                <b-form-input
                  :value="inputValue"
                  :placeholder="$t('message.birthday')"
                  :class="{'is-invalid': errors.birthday }"
                  v-on="inputEvents"
                />
                <b-form-invalid-feedback v-for="(error, i) in errors.birthday" :key="i">
                  {{ errors.birthday[i] }}
                </b-form-invalid-feedback>
              </template>
            </v-date-picker>
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.email')">
            <b-form-input v-model="data.email" :class="{'is-invalid': errors.email }" :placeholder="$t('message.email')" />
            <b-form-invalid-feedback v-for="(error, i) in errors.email" :key="i">
              {{ errors.email[i] }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.phone')">
            <b-form-input v-model="data.phone" :class="{'is-invalid': errors.phone }" :placeholder="$t('message.phone')" />
            <b-form-invalid-feedback v-for="(error, i) in errors.phone" :key="i">
              {{ errors.phone[i] }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.jobTitle')">
            <b-form-input v-model="data.job_title" :placeholder="$t('message.jobTitle')" />
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.department')">
            <treeselect
              v-model="data.department_id"
              :multiple="false"
              :options="departments"
              :normalizer="normalizer"
              :placeholder="$t('message.department')"
              :class="{'is-invalid': errors.department_id }"
            />
            <b-form-invalid-feedback v-for="(error, i) in errors.department_id" :key="i">
              {{ errors.department_id[i] }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.roles')">
            <treeselect
              v-model="data.role"
              :multiple="false"
              :options="roles"
              :normalizer="normalizer"
              :placeholder="$t('message.roles')"
              :class="{'is-invalid': errors.role }"
            />
            <b-form-invalid-feedback v-for="(error, i) in errors.role" :key="i">
              {{ errors.role[i] }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="3" label-cols-lg="3" :label="$t('message.active')">
            <treeselect
              v-model="data.active"
              :multiple="false"
              :options="[{ id: false, label: $t('message.no') }, { id: true, label: $t('message.yes') }]"
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      open: false,
      isEditing: false,
      data: {
        id: null,
        name: '',
        kana_name: '',
        username: '',
        email: '',
        phone: '',
        birthday: '',
        job_title: '',
        department_id: null,
        role: 4,
        active: true
      },
      errors: {},
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
      roles: 'acl/rolesSelectBox',
      departments: 'departments/departmentsSelectBox'
    }),
    processingFormFata() {
      return {
        ...this.data,
        birthday: this.data.birthday ? this.$dayjs(this.data.birthday).format('YYYY-MM-DD') : null
      }
    }
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.isEditing = false
      Object.keys(this.data).forEach(key => {
        if (key !== 'role') this.data[key] = null
      })
    },
    onSave() {
      if (!this.isEditing) {
        this.handleCreateUser()
      } else {
        this.handleUpdateUser()
      }
    },
    handleCreateUser() {
      const data = this.processingFormFata
      console.log('data', data)
      this.$store.dispatch('users/createUser', data)
        .then(response => {
          console.log('response', response)
          this.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.success'),
            text: this.$t('message.createdSuccessfully')
          })
        }).catch(error => {
          if (error.status === 422) {
            this.errors = error.data.errors
          }
        })
    },
    editingUser(user) {
      this.isEditing = true
      Object.keys(this.data).forEach(key => {
        const index = key.indexOf('_id')
        if (index !== -1 && user[key.substr(0, index)]) {
          this.data[key] = user[key.substr(0, index)].id
        } else {
          this.data[key] = user[key]
        }
      })
    },
    handleUpdateUser() {
      const data = this.processingFormFata
      this.$store.dispatch('users/updateUser', data)
        .then(() => {
          this.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.success'),
            text: this.$t('message.updatedSuccessfully')
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

