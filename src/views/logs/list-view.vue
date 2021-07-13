<template>
  <div class="table-responsive recent-order">
    <table class="table table-striped custom-table">
      <thead>
        <tr class="bg-primary">
          <th>ID</th>
          <th>{{ $t('message.activityLogsName') }}</th>
          <th>{{ $t('message.activityLogsDate') }}</th>
          <th>{{ $t('message.activityLogsIP') }}</th>
          <th>{{ $t('message.activityLogsDesc') }}</th>
          <th>{{ $t('message.activityLogsUser') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in activityLogsData" :key="order.id">
          <td>#{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.createdate }}</td>
          <td>{{ order.ip }}</td>
          <td>{{ order.description }}</td>
          <td>{{ order.user }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { activityLogsData } from 'Assets/data/activityLogs.js'
export default {
  data() {
    return {
      activityLogsData
    }
  }
}
</script>
