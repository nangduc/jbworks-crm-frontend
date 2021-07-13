<template>
  <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-9 col-xl-9">
    <div class="row align-items-stretch">
      <div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 grid-b-space">
        <app-card heading="Visual 20191101 小林様お打合せレイアウト" :heading-menu="true" custom-classes="mb-0">
          <div class="project-item">
            <div class="d-flex mb-3">
              <p class="text-muted mb-0 mr-3">{{ $t('message.taskName') }}:</p>
              <p class="m-0">{{ task.name }}</p>
            </div>
            <div class="d-flex mb-3">
              <p class="text-muted mb-0 mr-3">{{ $t('message.customerName') }}:</p>
              <p v-if="task.customer" class="m-0">{{ task.customer.name }}</p>
            </div>
            <div class="d-flex mb-3">
              <p class="text-muted mb-0 mr-3">{{ $t('message.taskType') }}:</p>
              <p v-if="task.task_type" class="m-0">{{ task.task_type.name }}</p>
            </div>
            <div class="d-flex mb-3">
              <p class="text-muted mb-0 mr-3">{{ $t('message.saleStatus') }}:</p>
              <a v-if="task.sale_status" class="m-0" href="#" @click="openDialog(task)">{{ task.sale_status.name }}</a>
            </div>
            <div class="d-flex mb-3">
              <p class="text-muted mb-0 mr-3">{{ $t('message.negotiationStatus') }}:</p>
              <a v-if="task.negotiation_status" class="m-0" href="#" @click="openDialog(task)">{{ task.negotiation_status.name }}</a>
            </div>
            <div class="mb-3">
              <h6 class="mb-3">{{ $t('message.content') }}:</h6>
              <p class="mb-3">
                <i class="material-icons text-muted">subjects</i>{{ task.description }}
              </p>
            </div>
            <div class="d-flex mb-3">
              <p class="text-muted mb-0 mr-3">{{ $t('message.negotiationResultStatus') }}:</p>
              <a v-if="task.negotiation_result_status" class="m-0" href="#" @click="openDialog(task)">{{ task.negotiation_result_status.name }}</a>
            </div>
            <div class="mb-3">
              <span class="text-muted mr-3">{{ $t('message.expectedOrderDate') }}: </span>
              <a href="#">{{ task.expected_order_at ? $dayjs(task.expected_order_at).locale($i18n.locale).format('L') : '' }}</a>
            </div>
            <div class="d-flex mb-3">
              <span class="text-muted mr-3">{{ $t('message.accuracy') }}: </span>
              <p v-if="task.accuracy" class="m-0">{{ task.accuracy.name }}</p>
            </div>
            <div class="mb-3">
              <span class="text-muted mr-3">{{ $t('message.nextNegotiationDate') }}: </span>
              <a v-if="task.next_negotiation_date" href="#">{{ $dayjs(task.next_negotiation_date).locale($i18n.locale).format('L') }}</a>
            </div>
            <div class="mb-3">
              <span class="text-muted mr-3">{{ $t('message.planNextTime') }}: </span>
              <span>{{ task.plan_next_time }}</span>
            </div>
            <div class="mb-3">
              <span class="text-muted mr-3">{{ $t('message.surveyPrice') }}: </span>
              <span>{{ new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(task.survey_price) }}</span>
            </div>
            <div class="mb-3">
              <span class="text-muted mr-3">{{ $t('message.insurancePrice') }}: </span>
              <span>{{ new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(task.insurance_price) }}</span>
            </div>
          </div>
          <task-progress :taskProgresses="taskProgresses" @onCreate="openDialog" @onEdit="openDialog" />
        </app-card>
      </div>
      <div v-if="task.user" class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 grid-b-space">
        <app-card custom-classes="peoples grid-b-space" heading="Thành viên thực hiện">
          <b-list-group>
            <b-list-group-item class="d-flex d-block align-items-center py-15 px-20">
              <div class="avatar-wrap">
                <img src="/static/img/user-1.jpg" class="rounded-circle" alt="user" width="45" height="45">
              </div>
              <div class="w-80">
                <div class="d-xl-flex justify-content-between mb-1 meta-info">
                  <h6 class="w-50">{{ task.user.name }}</h6>
                  <span class="font-xs text-muted w-50 d-block text-xl-right">@{{ task.user.username }}</span>
                </div>
                <div class="follow-status">
                  <span class="font-xs text-muted">{{ task.user.job_title }}</span>
                </div>
              </div>
            </b-list-group-item>
          </b-list-group>
        </app-card>
        <app-card custom-classes="peoples grid-b-space">
          <div>
            <ul>
              <li class="p-3 border-bottom d-flex justify-content-between align-content-center">
                <span class="fw-light text-capitalize fs-14 pr-10">{{ $t('message.createdAt') }} :</span>
                <span class="fw-semi-bold text-capitalize fs-14">{{ $dayjs(task.created_at).locale($i18n.locale).format('H:m L') }}</span>
              </li>
              <li class="p-3 border-bottom d-flex justify-content-between align-content-center">
                <span class="fw-light text-capitalize fs-14 pr-10">{{ $t('message.updatedAt') }} :</span>
                <span class="fw-semi-bold text-capitalize fs-14">{{ $dayjs(task.updated_at).locale($i18n.locale).format('H:m L') }}</span>
              </li>
            </ul>
          </div>
        </app-card>
      </div>
    </div>
    <task-progress-form ref="taskProgressForm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskProgress from './task-progress'
import TaskProgressForm from './components/TaskProgressForm'
export default {
  components: {
    TaskProgress,
    TaskProgressForm
  },
  computed: {
    ...mapGetters({
      task: 'taskDetail/task',
      taskProgresses: 'taskProgresses/taskProgresses'
    })
  },
  methods: {
    openDialog(taskProgress) {
      this.$refs.taskProgressForm.openDialog()
      if (taskProgress) {
        this.$refs.taskProgressForm.editingTaskProgress(taskProgress)
      }
    }
  }
}
</script>

<style>

</style>
