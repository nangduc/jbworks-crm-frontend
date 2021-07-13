<template>
  <div class="editConfirmationDialog">
    <b-modal v-model="open" size="lg" hide-footer centered :title="$t('message.taskProgress')" @hide="closeDialog">
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <div class="container">
            <div class="row">
              <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <b-form-group :label="$t('message.date')">
                  <v-date-picker v-model="data.date" :locale="$i18n.locale" range>
                    <template v-slot="{ inputValue, inputEvents }">
                      <b-form-input
                        :value="inputValue"
                        :placeholder="$t('message.date')"
                        v-on="inputEvents"
                      />
                    </template>
                  </v-date-picker>
                </b-form-group>
                <b-form-group :label="$t('message.saleStatus')">
                  <treeselect
                    v-model="data.sale_status_id"
                    :multiple="false"
                    :options="saleStatuses"
                    :normalizer="normalizer"
                    :placeholder="$t('message.saleStatus')"
                    @select="onSelectSaleStatus"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.negotiationStatus')">
                  <treeselect
                    v-model="data.negotiation_status_id"
                    :multiple="false"
                    :options="negotiationStatusesBySaleStatus"
                    :normalizer="normalizer"
                    :placeholder="$t('message.negotiationStatus')"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.negotiationResultStatus')">
                  <treeselect
                    v-model="data.negotiation_result_status_id"
                    :multiple="false"
                    :options="negotiationResultStatuses"
                    :normalizer="normalizer"
                    :placeholder="$t('message.negotiationResultStatus')"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.accuracy')">
                  <treeselect
                    v-model="data.accuracy_id"
                    :multiple="false"
                    :options="accuracies"
                    :normalizer="normalizer"
                    :placeholder="$t('message.accuracy')"
                  />
                </b-form-group>
              </div>
              <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <b-form-group :label="$t('message.companion')">
                  <treeselect
                    v-model="data.companion_id"
                    :multiple="false"
                    :options="companions.data"
                    :normalizer="normalizer"
                    :placeholder="$t('message.companion')"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.content')">
                  <b-form-textarea
                    v-model="data.description"
                    :placeholder="$t('message.content')"
                    rows="3"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.nextNegotiationDate')">
                  <v-date-picker v-model="data.next_negotiation_date" :locale="$i18n.locale">
                    <template v-slot="{ inputValue, inputEvents }">
                      <b-form-input
                        :value="inputValue"
                        :placeholder="$t('message.nextNegotiationDate')"
                        :popover="{visibility: 'focus'}"
                        v-on="inputEvents"
                      />
                    </template>
                  </v-date-picker>
                </b-form-group>
                <b-form-group :label="$t('message.planNextTime')">
                  <b-form-textarea
                    v-model="data.plan_next_time"
                    :placeholder="$t('message.planNextTime')"
                    rows="3"
                  />
                </b-form-group>
              </div>
            </div>
          </div>
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
      negotiationStatusesBySaleStatus: [],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name
        }
      },
      data: {
        id: null,
        date: new Date(),
        task_id: +this.$route.params.taskId,
        sale_status_id: null,
        negotiation_status_id: null,
        negotiation_result_status_id: null,
        accuracy_id: null,
        companion_id: null,
        description: '',
        next_negotiation_date: null,
        plan_next_time: ''
      },
      errors: {},
      isEditing: false
    }
  },
  computed: {
    ...mapGetters({
      saleStatuses: 'saleStatuses/saleStatuses',
      negotiationStatuses: 'negotiationStatuses/negotiationStatuses',
      negotiationResultStatuses: 'negotiationResultStatuses/negotiationResultStatuses',
      accuracies: 'accuracies/accuracies',
      companions: 'companions/companionsSelectBox'
    }),
    processingFormFata() {
      return {
        ...this.data,
        date: this.data.date ? this.$dayjs(this.data.date).format('YYYY-MM-DD') : '',
        next_negotiation_date: this.data.next_negotiation_date ? this.$dayjs(this.data.next_negotiation_date).format('YYYY-MM-DD') : ''
      }
    }
  },
  watch: {
    $route() {
      this.data.task_id = this.$route.params.taskId
    }
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.isEditing = false
    },
    editingTaskProgress(taskProgress) {
      console.log('task progress 123', taskProgress)
      this.isEditing = true
      this.data.id = taskProgress.id
      Object.keys(this.data).forEach(key => {
        const index = key.indexOf('_id')
        if (index !== -1 && taskProgress[key.substr(0, index)]) {
          this.data[key] = taskProgress[key.substr(0, index)].id
        } else {
          this.data[key] = taskProgress[key]
        }
      })
      if (taskProgress.sale_status) this.onSelectSaleStatus(taskProgress.sale_status)
    },
    onSelectSaleStatus(saleStatus) {
      const negotiationStatuses = []
      this.negotiationStatuses.forEach(negotiationStatus => {
        if (saleStatus.id === negotiationStatus.sale_status_id) {
          negotiationStatuses.push(negotiationStatus)
        }
      })
      this.negotiationStatusesBySaleStatus = negotiationStatuses
    },
    onSave() {
      if (!this.isEditing) {
        this.handleCreateTaskProgress()
      } else {
        this.handleUpdateTaskProgress()
      }
    },
    handleCreateTaskProgress() {
      const data = this.processingFormFata
      this.$store.dispatch('taskProgresses/createTaskProgress', data)
        .then(response => {
          Promise.all([
            this.$store.dispatch('taskProgresses/getTaskProgressesByTaskId', { taskId: data.task_id, length: 10 }),
            this.$store.dispatch('taskDetail/getTask', data.task_id)
          ])
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
    handleUpdateTaskProgress() {
      const data = this.processingFormFata
      this.$store.dispatch('taskProgresses/updateTaskProgress', data)
        .then(response => {
          Promise.all([
            this.$store.dispatch('taskProgresses/getTaskProgressesByTaskId', { taskId: data.task_id, length: 10 }),
            this.$store.dispatch('taskDetail/getTask', data.task_id)
          ])
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
