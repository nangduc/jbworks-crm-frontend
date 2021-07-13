<template>
  <div class="permission-wrapper">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
        <app-card custom-classes="grid-b-space">
          <b-form @submit.prevent="handleCreateRole('save')">
            <b-form-group :label="$t('message.name')" label-for="role">
              <b-form-input id="role" v-model="data.name" type="text" :class="{'is-invalid': errors.name }" class="mb-2" />
              <template v-if="errors.name">
                <b-form-invalid-feedback v-for="(error, i) in errors.name" :key="i">{{ errors.name[i] }}</b-form-invalid-feedback>
              </template>
            </b-form-group>
            <b-form-group :label="$t('message.description')" label-for="description">
              <b-form-textarea id="description" v-model="data.description" rows="3" />
            </b-form-group>
          </b-form>
        </app-card>
        <app-card v-if="treeData && treeData.length" customClasses="grid-b-space">
          <tree
            v-model="data.permissions"
            class="tree--small"
            :data="treeData"
            :options="treeOptions"
          >
            <span slot-scope="{ node }" class="tree-text">
              <template v-if="!node.hasChildren()">
                {{ node.text }}
              </template>

              <template v-else>
                <span class="badge badge-warning">{{ node.text }}</span>
              </template>
            </span>
          </tree>
        </app-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <app-card :heading="$t('message.action')">
          <button type="submit" class="btn btn-sm d-inline-flex align-items-center text-capitalize btn-primary" @click="handleCreateRole('save')">
            <i class="material-icons btn-icon mr-1">save</i>{{ $t('message.saveAndBack') }}
          </button>
          <button type="submit" class="btn btn-sm d-inline-flex align-items-center text-capitalize btn-success ml-3" @click="handleCreateRole('saveAndEdit')">
            <i class="material-icons btn-icon mr-1">check_circle</i>{{ $t('message.saveAndEdit') }}
          </button>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      treeData: this.permissions,
      treeOptions: {
        deletion: node => !node.hasChildren(),
        checkbox: true,
        propertyNames: {
          text: 'name'
        }
      },
      data: {
        name: '',
        description: '',
        permissions: []
      },
      errors: {}
    }
  },
  computed: {
    ...mapGetters({
      permissions: 'acl/permissions'
    })
  },
  watch: {
    permissions(newData, oldData) {
      this.treeData = newData
    }
  },
  created() {
    this.$store.dispatch('acl/getPermissions')
  },
  methods: {
    handleCreateRole(btn) {
      const { name, description } = this.data
      const permissions = []
      this.data.permissions.checked.map(element => {
        if (element.data.permission) {
          permissions.push(element.data.permission)
        }
      })
      this.$store.dispatch('acl/createRole', { name, description, permissions }).then(response => {
        if (btn === 'save') this.$router.push({ name: 'roles' })
        if (btn === 'saveAndEdit') this.$router.push({ name: 'edit-role', params: { id: response.data.id }})
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
    }
  }
}
</script>
