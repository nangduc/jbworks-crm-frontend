<template>
  <div class="wallet-tab-list">
    <b-card no-body class="mb-3 border-0">
      <div v-b-toggle.taskProgress>
        <p class="mb-0 wallet-title d-flex justify-content-center align-items-center">
          <span>{{ $t('message.taskProgress') }}</span>
          <i class="zmdi zmdi-chevron-down font-lg ml-2" />
        </p>
      </div>
      <b-collapse id="taskProgress" accordion="my-accordion" role="tabpanel">
        <b-card-header>
          <create-button @onCreate="onCreate" />
          <bulk-delete-button class="ml-2" @onDelete="showDeleteConfirmation" />
        </b-card-header>
        <b-card-body>
          <div class="table-responsive">
            <table class="table table-striped custom-table">
              <thead>
                <tr>
                  <th>
                    <div class="custom-control custom-checkbox">
                      <input id="__BVID__56" v-model="selectAll" type="checkbox" class="custom-control-input">
                      <label class="custom-control-label" for="__BVID__56" />
                    </div>
                  </th>
                  <th>{{ $t('message.date') }}</th>
                  <th>{{ $t('message.saleStatus') }}</th>
                  <th>{{ $t('message.negotiationStatus') }}</th>
                  <th>{{ $t('message.negotiationResultStatus') }}</th>
                  <th>{{ $t('message.accuracy') }}</th>
                  <th>{{ $t('message.companion') }}</th>
                  <th>{{ $t('message.content') }}</th>
                  <th>{{ $t('message.nextNegotiationDate') }}</th>
                  <th>{{ $t('message.planNextTime') }}</th>
                  <th>{{ $t('message.action') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="taskProgress in taskProgresses.data" :key="taskProgress.id">
                  <td>
                    <b-form-checkbox v-model="ids" :value="taskProgress.id" />
                  </td>
                  <td>{{ taskProgress.date ? $dayjs(taskProgress.date).locale($i18n.locale).format('L') : '' }}</td>
                  <td>{{ taskProgress.sale_status ? taskProgress.sale_status.name : '' }}</td>
                  <td>{{ taskProgress.negotiation_status ? taskProgress.negotiation_status.name : '' }}</td>
                  <td>{{ taskProgress.negotiation_result_status ? taskProgress.negotiation_result_status.name : '' }}</td>
                  <td>{{ taskProgress.accuracy ? taskProgress.accuracy.name : '' }}</td>
                  <td>{{ taskProgress.companion ? taskProgress.companion.name : '' }}</td>
                  <td>{{ taskProgress.description }}</td>
                  <td>{{ taskProgress.next_negotiation_date ? $dayjs(taskProgress.next_negotiation_date).locale($i18n.locale).format('L') : '' }}</td>
                  <td>{{ taskProgress.plan_next_time }}</td>
                  <td class="table-action d-flex">
                    <a href="javascript:;" class="icon-btn text-primary" @click="onEdit(taskProgress)">
                      <i class="zmdi zmdi-edit" />
                    </a>
                    <a href="javascript:;" class="icon-btn text-danger" @click="showDeleteConfirmation(taskProgress)">
                      <i class="zmdi zmdi-delete" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pagination
            v-if="taskProgresses.meta && taskProgresses.meta.last_page > 1"
            class="float-right"
            :totalRow="taskProgresses.meta.total"
            :perPage="taskProgresses.meta.per_page"
            :page="page"
            @onChangePage="onPageChanged"
          />
        </b-card-body>
      </b-collapse>
    </b-card>
    <delete-confirmation-dialog
      ref="deleteConfirmationDialog"
      :heading="$t('message.confirmDelete')"
      :message="message"
      @onConfirm="handleDeleteTaskProgress"
    />
  </div>
</template>

<script>
export default {
  props: {
    taskProgresses: { type: Object, required: true }
  },
  data() {
    return {
      ids: [],
      message: '',
      page: 1 // current page
    }
  },
  computed: {
    // select all role checkbox
    selectAll: {
      get: function() {
        return this.taskProgresses.data ? this.ids.length === this.taskProgresses.data.length : false
      },
      set: function(value) {
        const ids = []
        if (value && this.taskProgresses.data) {
          this.taskProgresses.data.forEach(taskProgress => { ids.push(taskProgress.id) })
        }
        this.ids = ids
      }
    }
  },
  methods: {
    onCreate() {
      this.$emit('onCreate')
    },
    onEdit(taskProgress) {
      this.$emit('onEdit', taskProgress)
    },
    onPageChanged(page) {
      this.page = page
      const { taskId } = this.$route.params
      this.$store.dispatch('taskProgresses/getTaskProgressesByTaskId', { taskId, page, length: 5 })
    },
    showDeleteConfirmation(taskProgress) {
      if (taskProgress) this.ids = [taskProgress.id]
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
    handleDeleteTaskProgress() {
      const { ids } = this
      const { taskId } = this.$route.params
      if (ids.length) {
        this.$store.dispatch('taskProgresses/softDeleteTaskProgress', ids).then(response => {
          Promise.all([
            this.$store.dispatch('taskProgresses/getTaskProgressesByTaskId', { taskId, length: 10 }),
            this.$store.dispatch('taskDetail/getTask', taskId)
          ])
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

<style lang="scss" scoped>
.wallet-tab-list .card {
  box-shadow: none;
  .custom-table {
    tbody {
      tr {
        td {
          padding: 0.25rem 0.75rem
        }
      }
    }
  }
}
</style>
