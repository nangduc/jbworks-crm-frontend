<template>
  <div id="customer-list-wrapper">
    <div class="row align-items-stretch">
      <report-list :reports="reports.data" />
      <report-detail :report="report" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ReportList from './report-list'
import ReportDetail from './report-detail'
export default {
  name: 'reports',
  components: {
    ReportList,
    ReportDetail
  },
  data() {
    return {
      length: 10
    }
  },
  computed: {
    ...mapGetters({
      reports: 'reports/reports',
      report: 'reports/report'
    })
  },
  watch: {
    $route(to, from) {
      const { id } = to.params
      const dispatchGetReport = id ? this.$store.dispatch('reports/getReport', id) : this.$store.dispatch('reports/getLastReport')
      Promise.all([
        dispatchGetReport,
        this.$store.dispatch('comments/getCommentsByReportId', { length: 100, id })
      ])
    }
  },
  created() {
    const { id } = this.$route.params

    const dispatchGetReport = id ? this.$store.dispatch('reports/getReport', id) : this.$store.dispatch('reports/getLastReport')
    Promise.all([
      this.$store.dispatch('reports/getAllReports', { length: this.length }),
      dispatchGetReport,
      this.$store.dispatch('comments/getCommentsByReportId', { length: 100, id })
    ])
  }
}
</script>

<style lang="scss" scoped>
  .reports-table {
    table {
      tbody {
        tr {
          cursor: pointer;
        }
      }
    }
  }
</style>
