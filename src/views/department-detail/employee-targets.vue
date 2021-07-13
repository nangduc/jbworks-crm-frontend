<template>
  <div class="table-responsive">
    <app-card custom-classes="grid-b-space">
      <div class="mb-2 w-30">
        <datepicker
          :value="defaultDate"
          :format="DatePickerFormat"
          :language="language"
          :listusers="listusers"
          minimum-view="month"
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
          <tr v-for="listuser in listusers" :key="listuser.id">
            <td>{{ listuser.name }}</td>
            <td>{{ new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(listuser.target) }}</td>
            <td>{{ new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(listuser.achievement) }}</td>
            <td>{{ listuser.rate }}</td>
          </tr>
        </tbody>
      </table>
    </app-card>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      defaultDate: new Date().toDateString(),
      DatePickerFormat: 'yyyy年M月度',
      language: {
        language: 'Japanese',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthsAbbr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        days: ['日', '月', '火', '水', '木', '金', '土'],
        rtl: false,
        ymd: false,
        yearSuffix: '年'
      },
      listusers: [
        { name: 'Dung', target: '50000', achievement: '25000', rate: '50%' },
        { name: 'Dung', target: '50000', achievement: '25000', rate: '50%' },
        { name: 'Dung', target: '50000', achievement: '25000', rate: '50%' },
        { name: 'Dung', target: '50000', achievement: '25000', rate: '50%' },
        { name: 'Dung', target: '50000', achievement: '25000', rate: '50%' },
        { name: 'Dung', target: '50000', achievement: '25000', rate: '50%' },
        { name: 'Dung', target: '50000', achievement: '25000', rate: '50%' }
      ]
    }
  }
}
</script>
