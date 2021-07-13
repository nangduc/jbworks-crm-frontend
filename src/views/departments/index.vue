<template>
  <div class="target-achievement-wrapper">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <app-card customClasses="grid-b-space" :showHeading="true">
          <div slot="card-heading" class="d-flex justify-content-start align-items-center">
            <create-button @onCreate="openDialog" />
            <search-box class="ml-5" :search="search" />
          </div>
          <!-- <v-jstree
            v-if="departments && departments.data"
            :data="departments.data"
            :collapse="true"
            text-field-name="name"
          >
            <template scope="node">
              <div class="node-container">
                <i v-if="!node.model.loading" :class="node.vm.themeIconClasses" role="presentation" />
                <h5 class="node-text" @click="redirectTo(node.model)">{{ node.model.name }}</h5>
                <div class="node-controls">
                  <a href="#" class="px-10" @click="openDialog(node.model)">
                    <i class="zmdi zmdi-edit" />
                  </a>
                  <a href="#" class="px-10" @click="showDeleteConfirmation(node.model)">
                    <i class="text-danger zmdi zmdi-delete" />
                  </a>
                </div>
              </div>
            </template>
          </v-jstree> -->
          <el-tree :data="departments.data" :props="defaultProps" default-expand-all>
            <template slot-scope="{ node, data }">
              <div class="node-container">
                <h5 class="node-text" @click="redirectTo(data)">{{ data.name }}</h5>
                <div class="node-controls">
                  <a href="#" class="px-10" @click="openDialog(node, data)">
                    <i class="zmdi zmdi-edit" />
                  </a>
                  <a href="#" class="px-10" @click="showDeleteConfirmation(node, data)">
                    <i class="text-danger zmdi zmdi-delete" />
                  </a>
                </div>
              </div>
            </template>
          </el-tree>
        </app-card>
      </div>
    </div>
    <department-form ref="departmentForm" :departments="departments" />
    <delete-confirmation-dialog
      ref="deleteConfirmationDialog"
      :heading="$t('message.confirmDelete')"
      :message="message"
      @onConfirm="handleDeleteTask"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DepartmentForm from './components/DepartmentForm'
export default {
  name: 'departments',
  components: {
    DepartmentForm
  },
  data() {
    return {
      search: '', // search box keyword,
      length: 100,
      page: 1, // current page
      id: null,
      message: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters({
      departments: 'departments/departments'
    })
  },
  created() {
    Promise.all([
      this.$store.dispatch('departments/getAllDepartments'),
      this.$store.dispatch('users/getUsersForSelectBox', { length: 10 })
    ])
  },
  methods: {
    editNode(node, e) {
      node.startEditing()
    },
    removeNode(node) {
      node.remove()
    },
    openDialog(node, department) {
      if (department) {
        this.$refs.departmentForm.editingDepartment(department)
      }
      this.$refs.departmentForm.openDialog()
    },
    redirectTo(department) {
      this.$router.push({ name: 'department', params: { id: department.id }})
    },
    showDeleteConfirmation(node, department) {
      if (department) {
        this.id = department.id
        this.message = this.$t('message.doYouReallyWantToDeleteThisRecord')
        this.$refs.deleteConfirmationDialog.openDialog()
      }
    },
    handleDeleteTask() {
      const { id } = this
      this.$store.dispatch('departments/softDeleteDepartment', id).then(response => {
        this.$refs.deleteConfirmationDialog.closeDialog()
        this.$notify({
          group: 'notify',
          type: 'success',
          duration: 5000,
          title: this.$t('message.deletedSuccessfully')
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .tree-node .tree-anchor {
    width: 100% !important;
    padding-right: 30px
  }
  .node-container {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
</style>
