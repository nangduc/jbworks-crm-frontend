<template>
  <div class="table-responsive">
    <app-card custom-classes="grid-b-space">
      <div id="getdata" class="mb-2 w-30">
        <datepicker
          :value="defaultDate"
          :format="DatePickerFormat"
          :language="language"
          minimum-view="year"
        />
      </div>
      <table class="table table-striped custom-table">
        <thead>
          <tr>
            <th />
            <th>{{ $t('message.target') }}</th>
            <th>{{ $t('message.achievement') }}</th>
            <th>{{ $t('message.achievedRate') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="listmonth in listmonths" :key="listmonth.id">
            <td> 2021 年 {{ listmonth.month }} 月度</td>
            <td><input id="target" :value="50000" type="number" style="width: 20%"></td>
            <td>{{ new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(50000) }}</td>
            <td> {{ achievedRate }}% </td>
          </tr>
        </tbody>
      </table>
    </app-card>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  components: {
    Datepicker
  },
  props: {
    departmentTargets: { type: Array, required: true, default: () => [] }
  },
  data() {
    return {
      defaultDate: new Date().toDateString(),
      DatePickerFormat: 'yyyy 年',
      language: {
        language: 'Japanese',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthsAbbr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        days: ['日', '月', '火', '水', '木', '金', '土'],
        rtl: false,
        ymd: false,
        yearSuffix: '年'
      },
      listmonths: [
        { month: '1' },
        { month: '2' },
        { month: '3' },
        { month: '4' },
        { month: '5' },
        { month: '6' },
        { month: '7' },
        { month: '8' },
        { month: '9' },
        { month: '10' },
        { month: '11' },
        { month: '12' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      departmenttargets: 'departmenttargets/departmenttargets'
    }),
    ...mapState({
      departmenttargets: state => state.departmenttargets.departmenttargets
    })
  },
  methods: {
    getachievement(value) {
      let achievedRate
      // eslint-disable-next-line prefer-const
      achievedRate = this.achievement / this.targets * 100
      return achievedRate
    }
  }
}
</script>
