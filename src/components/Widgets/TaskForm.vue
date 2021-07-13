<template>
  <div class="editConfirmationDialog">
    <b-modal
      v-model="open"
      size="lg"
      hide-footer
      centered
      :title="isEditing ? $t('message.editTask') : $t('message.createNewTask')"
      @hide="closeDialog"
    >
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <div class="container">
            <div class="row">
              <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <b-form-group :label="$t('message.taskName')">
                  <b-form-input v-model="data.name" :class="{'is-invalid': errors.name }" :placeholder="$t('message.taskName')" />
                  <b-form-invalid-feedback v-for="(error, i) in errors.name" :key="i">
                    {{ errors.name[i] }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :label="$t('message.customerName')">
                  <treeselect
                    v-model="data.customer_id"
                    :multiple="false"
                    :options="customers.data"
                    :normalizer="normalizer"
                    :placeholder="$t('message.pleaseSelect')"
                    :class="{'is-invalid': errors.customer_id }"
                  />
                  <b-form-invalid-feedback v-for="(error, i) in errors.customer_id" :key="i">
                    {{ errors.customer_id[i] }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :label="$t('message.taskType')">
                  <treeselect
                    v-model="data.task_type_id"
                    :multiple="false"
                    :disable-branch-nodes="true"
                    :options="taskTypes.data"
                    :normalizer="normalizerTaskType"
                    :placeholder="$t('message.pleaseSelect')"
                    :default-expand-level="1"
                    :class="{'is-invalid': errors.task_type_id }"
                  />
                  <b-form-invalid-feedback v-for="(error, i) in errors.task_type_id" :key="i">
                    {{ errors.task_type_id[i] }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :label="$t('message.saleStatus')">
                  <treeselect
                    v-model="data.sale_status_id"
                    :multiple="false"
                    :options="saleStatuses"
                    :normalizer="normalizer"
                    :placeholder="$t('message.pleaseSelect')"
                    :class="{'is-invalid': errors.sale_status_id }"
                    @select="onSelectSaleStatus"
                  />
                  <b-form-invalid-feedback v-for="(error, i) in errors.sale_status_id" :key="i">
                    {{ errors.sale_status_id[i] }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :label="$t('message.negotiationStatus')">
                  <treeselect
                    v-model="data.negotiation_status_id"
                    :multiple="false"
                    :options="negotiationStatusesBySaleStatus"
                    :normalizer="normalizer"
                    :placeholder="$t('message.pleaseSelect')"
                  />
                </b-form-group>
              </div>
              <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <b-form-group :label="$t('message.accuracy')">
                  <treeselect
                    v-model="data.accuracy_id"
                    :multiple="false"
                    :options="accuracies"
                    :normalizer="normalizer"
                    :placeholder="$t('message.pleaseSelect')"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.companion')">
                  <treeselect
                    v-model="data.companion_id"
                    :multiple="false"
                    :options="companions.data"
                    :normalizer="normalizer"
                    :placeholder="$t('message.pleaseSelect')"
                  />
                </b-form-group>
                <b-form-group :label="$t('message.content')">
                  <b-form-textarea
                    id="textarea"
                    v-model="data.description"
                    placeholder="Enter something..."
                    rows="5"
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
  props: {
    user: { type: Object, default: () => [] }
  },
  data() {
    return {
      open: false,
      negotiationStatusesBySaleStatus: [],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },
      normalizerTaskType(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.task_types
        }
      },
      data: {
        id: null,
        user_id: null,
        name: '',
        description: '',
        customer_id: null,
        task_type_id: null,
        date: new Date(),
        sale_status_id: null,
        negotiation_status_id: null,
        accuracy_id: null,
        companion_id: null
      },
      errors: {},
      isEditing: false
    }
  },
  computed: {
    ...mapGetters({
      customers: 'customers/customersForSelectBox',
      taskTypes: 'taskTypes/taskTypesSelectBox',
      saleStatuses: 'saleStatuses/saleStatuses',
      negotiationStatuses: 'negotiationStatuses/negotiationStatuses',
      accuracies: 'accuracies/accuracies',
      companions: 'companions/companionsSelectBox'
    })
  },
  watch: {
    user(user) {
      this.data.user_id = user.id
    }
  },
  methods: {
    openDialog() {
      this.open = true
      this.data.user_id = this.user.id
    },
    closeDialog() {
      this.open = false
      this.isEditing = false
      Object.keys(this.data).forEach(key => {
        if (key !== 'user_id' && key !== 'date') this.data[key] = null
      })
    },
    onSave() {
      if (!this.isEditing) {
        this.handleCreateTask()
      } else {
        this.handleUpdateTask()
      }
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
    handleCreateTask() {
      const data = {
        ...this.data,
        date: this.data.date ? this.$dayjs(this.data.date).format('YYYY-MM-DD') : ''
      }
      this.$store.dispatch('tasks/createTask', data)
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
    /**
     * fill editing data  in  form
     * @param object task
     */
    editingTask(task) {
      this.isEditing = true
      this.data.id = task.id
      Object.keys(this.data).forEach(key => {
        const index = key.indexOf('_id')
        if (index !== -1 && task[key.substr(0, index)]) {
          this.data[key] = task[key.substr(0, index)].id
        } else {
          this.data[key] = task[key]
        }
      })
      if (task.sale_status) this.onSelectSaleStatus(task.sale_status)
    },
    handleUpdateTask() {
      const { data } = this
      this.$store.dispatch('tasks/updateTask', data)
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
