<template>
  <div class="col-half-lg-block col-sm-12 col-md-12 col-lg-4 col-xl-4">
    <app-card custom-classes="grid-b-space">
      <b-tabs ref="tabs" card>
        <b-tab title="Báo cáo">
          <div class="table-responsive reports-table">
            <table class="table table-striped custom-table">
              <thead>
                <tr>
                  <th>{{ $t('message.id') }}</th>
                  <th>{{ $t('message.reportDate') }}</th>
                  <th>{{ $t('message.employee') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in reports" :key="report.id">
                  <td>#{{ report.id }}</td>
                  <th>
                    <router-link :to="{name: 'report', params: {id: report.id}}">
                      {{ $dayjs(report.created_at).locale($i18n.locale).format('L') }}
                    </router-link>
                  </th>
                  <th>{{ report.user.name }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>
      </b-tabs>
    </app-card>
  </div>
</template>

<script>
export default {
  props: {
    reports: { type: Array, required: true, default: () => [] }
  }
}
</script>

<style lang="scss" scoped>
.router-link-active {
  color: #5D92F4
}
</style>

