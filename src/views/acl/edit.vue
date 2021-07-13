<template>
  <div class="permission-wrapper">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
        <app-card custom-classes="grid-b-space">
          <b-form @submit.prevent="handleUpdateRole('save')">
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
          <button type="submit" class="btn d-inline-flex align-items-center text-capitalize btn-primary" @click="handleUpdateRole('save')">
            <i class="material-icons btn-icon mr-1">save</i>{{ $t('message.saveAndBack') }}
          </button>
          <button type="button" class="btn d-inline-flex align-items-center text-capitalize btn-success ml-3" @click="handleUpdateRole('saveAndEdit')">
            <i class="material-icons btn-icon mr-1">check_circle</i>{{ $t('message.saveAndEdit') }}
          </button>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      treeData: this.permissions,
      treeOptions: {
        checkbox: true,
        propertyNames: {
          text: 'name'
        }
      },
      data: {
        id: null,
        name: '',
        description: '',
        permissions: []
      },
      errors: {}
    }
  },
  computed: {
    ...mapState({
      role: state => state.acl.role
    }),
    ...mapGetters({
      permissions: 'acl/permissionsViaRole'
    })
  },
  watch: {
    permissions(newData, oldData) {
      this.treeData = newData
    },
    role(role) {
      this.data.id = role.id
      this.data.name = role.name
      this.data.description = role.description
    }
  },
  created() {
    const { id } = this.$route.params
    this.$store.dispatch('acl/getRoleById', id)
  },
  methods: {
    handleUpdateRole(btn) {
      const { id, name, description } = this.data
      const permissions = []
      this.data.permissions.checked.map(element => {
        if (element.data.permission) {
          permissions.push(element.data.permission)
        }
      })
      this.$store.dispatch('acl/updateRole', { id, name, description, permissions })
        .then(response => {
          if (btn === 'save') this.$router.push({ name: 'roles' })
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
