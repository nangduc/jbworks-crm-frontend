<template>
  <div id="responsive-table">
    <app-card custom-classes="grid-b-space" :showHeading="true" :heading="$t('message.taskType')">
      <div slot="card-heading" class="d-flex justify-content-start align-items-center">
        <create-button @onCreate="openDialog" />
      </div>
      <!-- <v-jstree
        ref="tree"
        :data="taskTypesData"
        :collapse="true"
        text-field-name="name"
      >
        <template scope="node">
          <div class="node-container">
            <i v-if="!node.model.loading" :class="node.vm.themeIconClasses" role="presentation" />
            <h5 class="node-text">{{ node.model.name }}</h5>
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
      <el-tree :data="taskTypes.data" :props="defaultProps">
        <template slot-scope="{ node, data }">
          <div class="node-container">
            <span class="node-text">{{ data.name }}</span>
            <div v-if="node.isLeaf" class="node-controls">
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
    <task-type-form ref="taskTypeForm" />
    <delete-confirmation-dialog
      ref="deleteConfirmationDialog"
      :heading="$t('message.confirmDelete')"
      :message="message"
      @onConfirm="handleDeleteTaskType"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskTypeForm from './components/TaskTypeForm'
export default {
  name: 'task-types',
  components: {
    TaskTypeForm
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      id: null,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      taskTypes: 'taskTypes/taskTypes'
    })
  },
  created() {
    Promise.all([
      this.$store.dispatch('taskTypes/getAllTaskTypes'),
      this.$store.dispatch('taskGroups/getTaskGroupsForSelectBox')
    ])
  },
  methods: {
    openDialog(node, data) {
      if (data) {
        this.$refs.taskTypeForm.editingTaskType(data)
      }
      this.$refs.taskTypeForm.openDialog()
    },
    showDeleteConfirmation(node, data) {
      if (data) {
        this.id = data.id
        this.message = this.$t('message.doYouReallyWantToDeleteThisRecord')
        this.$refs.deleteConfirmationDialog.openDialog()
      }
    },
    handleDeleteTaskType() {
      const { id } = this
      this.$store.dispatch('taskTypes/deleteTaskType', id).then(response => {
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
</script>

<style>
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
