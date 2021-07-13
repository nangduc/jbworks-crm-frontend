<template>
  <div class="department-form">
    <b-modal v-model="open" size="md" hide-footer centered :title="isEditing ? $t('message.editTaskType') : $t('message.createNewTaskType')" @hide="closeDialog">
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <b-form-group :label="$t('message.taskType')">
            <b-form-input v-model="data.name" :placeholder="$t('message.taskType')" />
          </b-form-group>
          <b-form-group :label="$t('message.taskGroups')">
            <treeselect
              v-model="data.task_group_id"
              :multiple="false"
              :options="taskGroups"
              :normalizer="normalizer"
              :placeholder="$t('message.taskGroups')"
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
        task_group_id: null
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
      taskGroups: 'taskGroups/taskGroupsSelectBox'
    })
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.isEditing = false
    },
    onSave() {
      if (!this.isEditing) {
        this.handleCreateTaskType()
      } else {
        this.handleUpdateTaskType()
      }
    },
    handleCreateTaskType() {
      const { data } = this
      this.$store.dispatch('taskTypes/createTaskType', data)
        .then(() => {
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
    editingTaskType(taskType) {
      this.isEditing = true
      Object.keys(this.data).forEach(key => {
        this.data[key] = taskType[key]
      })
    },
    handleUpdateTaskType() {
      const { data } = this
      this.$store.dispatch('taskTypes/updateTaskType', data)
        .then(() => {
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
    }
  }
}
</script>
