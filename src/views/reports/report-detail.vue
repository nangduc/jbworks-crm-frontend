<template>
  <div class="col-half-lg-block col-sm-12 col-md-12 col-lg-8 col-xl-8">
    <app-card>
      <div class="table-responsive reports-table ">
        <table class="table table-striped custom-table">
          <thead>
            <tr>
              <th>{{ $t('message.id') }}</th>
              <th>{{ $t('message.taskName') }}</th>
              <th>{{ $t('message.customerName') }}</th>
              <th>{{ $t('message.saleStatus') }}</th>
              <th>{{ $t('message.negotiationStatus') }}</th>
              <th>{{ $t('message.negotiationResultStatus') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in report.properties" :key="index">
              <td>#{{ task.id }}</td>
              <th>{{ task.name }}</th>
              <th>{{ task.customer }}</th>
              <th>{{ task.sale_status }}</th>
              <th>{{ task.negotiation_status }}</th>
              <th>{{ task.negotiation_result_status }}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-5">
        <h6 class="mb-3">{{ $t('message.otherReports') }} :</h6>
        <p class="mb-3">
          <i class="material-icons text-muted">subjects</i> {{ report.content }}
        </p>
      </div>
      <comments :report="report" />
    </app-card>
  </div>
</template>

<script>
import Comments from './comments'
export default {
  components: { Comments },
  props: {
    report: { type: Object, default: () => {} }
  }
}
</script>

