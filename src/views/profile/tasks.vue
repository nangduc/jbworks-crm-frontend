<template>
  <div class="tasks">
    <!--adding title for display name-->
    <div class="idb-block-content"><h5 class="mb-0"> 商談レポート</h5></div>
    <!--end-->
    <app-card :showFooter="true" :showHeading="true">
      <div slot="card-heading" class="d-flex justify-content-start align-items-center">
        <create-button @onCreate="openDialog" />
        <bulk-delete-button class="ml-2" @onDelete="showDeleteConfirmation" />
        <search-box class="ml-5" :search="search" @onSearch="handleSearchTask" />
      </div>
      <task-list
        :tasks="tasks.data"
        :showOperation="true"
        :showCheckbox="true"
        @onCheckbox="onCheckBox"
        @onDelete="showDeleteConfirmation"
        @onEdit="openDialog"
      />
      <div slot="card-footer" class="d-flex justify-content-between">
        <data-table-length :length="length" @onChangeDataTableLength="changeDataTableLength" />
        <pagination
          v-if="tasks.meta && tasks.meta.last_page > 1"
          :totalRow="tasks.meta.total"
          :perPage="tasks.meta.per_page"
          :page="page"
          @onChangePage="onPageChanged"
        />
      </div>
    </app-card>
    <task-form ref="taskForm" :open="open" :user="user" />
    <delete-confirmation-dialog
      ref="deleteConfirmationDialog"
      :heading="$t('message.confirmDelete')"
      :message="message"
      @onConfirm="handleDeleteTask"
    />
  </div>
</template>

<script>
import TaskList from 'Components/Widgets/TaskList'
import TaskForm from 'Components/Widgets/TaskForm'
export default {
  components: {
    TaskList,
    TaskForm
  },
  props: {
    tasks: { type: Object, required: true },
    user: { type: Object, default: () => [] }
  },
  data() {
    return {
      open: false,
      search: '', // search box keyword
      length: 10, // data table length
      page: 1, // current page
      ids: [],
      message: ''
    }
  },
  methods: {
    changeDataTableLength(length) {
      const userId = this.$route.params.id
      this.length = length
      this.search = ''
      this.page = 1
      this.$store.dispatch('tasks/getTasksByUserId', { userId, length })
    },
    onPageChanged(page) {
      const userId = this.$route.params.id
      const { search, length } = this
      this.page = page
      this.$store.dispatch('tasks/getTasksByUserId', { userId, page, search, length })
    },
    handleSearchTask(search) {
      const userId = this.$route.params.id
      const { length } = this
      this.search = search
      this.page = 1
      this.$store.dispatch('tasks/getTasksByUserId', { userId, search, length })
    },
    openDialog(task) {
      if (task) {
        this.$refs.taskForm.editingTask(task)
      }
      this.$refs.taskForm.openDialog()
    },
    onCheckBox(ids) {
      this.ids = ids
    },
    showDeleteConfirmation(task) {
      if (task) this.ids = [task.id]
      if (this.ids.length) {
        if (this.ids.length > 1) this.message = this.$t('message.doYouReallyWantToDeleteSelectedRecords')
        else this.message = this.$t('message.doYouReallyWantToDeleteThisRecord')
        this.$refs.deleteConfirmationDialog.openDialog()
      } else {
        this.$notify({
          group: 'notify',
          type: 'warn',
          duration: 5000,
          title: this.$t('message.pleaseSelectAtLeastOneRecordToPerformThisAction')
        })
      }
    },
    handleDeleteTask() {
      const { ids, user } = this
      if (ids.length) {
        this.$store.dispatch('tasks/softDeleteTask', { ids, user }).then(response => {
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
}
</script>

