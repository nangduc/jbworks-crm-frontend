<template>
  <div class="table-responsive">
    <table class="table table-striped custom-table">
      <thead>
        <tr>
          <th v-if="showCheckbox">
            <div class="custom-control custom-checkbox">
              <input id="__BVID__56" v-model="selectAll" type="checkbox" class="custom-control-input">
              <label class="custom-control-label" for="__BVID__56" />
            </div>
          </th>
          <th>{{ $t('message.id') }}</th>
          <th>{{ $t('message.tasks') }}</th>
          <th>{{ $t('message.curator') }}</th>
          <th v-if="showCustomerColumn">{{ $t('message.customerName') }}</th>
          <th>{{ $t('message.expectedOrderDate') }}</th>
          <th>{{ $t('message.accuracy') }}</th>
          <th>{{ $t('message.saleProgress') }}</th>
          <th>{{ $t('message.negotiationStatus') }}</th>
          <th>{{ $t('message.negotiationResultStatus') }}</th>
          <th v-if="showOperation">{{ $t('message.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td v-if="showCheckbox">
            <b-form-checkbox v-model="ids" :value="task.id" />
          </td>
          <td>#{{ task.id }}</td>
          <td>
            <router-link :to="{name: 'task', params: {userId: task.user.id, taskId: task.id}}">{{ task.name }}</router-link>
          </td>
          <td>{{ task.user.name }}</td>
          <td v-if="showCustomerColumn">{{ task.customer.name }}</td>
          <td>{{ task.expected_order_at }}</td>
          <td>{{ task.accuracy ? task.accuracy.name : '' }}</td>
          <td>{{ task.sale_status ? task.sale_status.name : '' }}</td>
          <td>{{ task.negotiation_status ? task.negotiation_status.name : '' }}</td>
          <td>{{ task.negotiation_result_status ? task.negotiation_result_status.name : '' }}</td>
          <td v-if="showOperation" class="table-action d-flex">
            <a href="javascript:;" class="icon-btn text-primary" @click="onEdit(task)">
              <i class="zmdi zmdi-edit" />
            </a>
            <a href="javascript:;" class="icon-btn text-danger" @click="onDelete(task)">
              <i class="zmdi zmdi-delete" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tasks: { type: Array, required: true, default: () => [] },
    showOperation: { type: Boolean, default: false },
    showCheckbox: { type: Boolean, default: false },
    showCustomerColumn: { type: Boolean, default: true }
  },
  data() {
    return {
      ids: []
    }
  },
  computed: {
    // select all role checkbox
    selectAll: {
      get: function() {
        this.$emit('onCheckbox', this.ids)
        return this.tasks ? this.ids.length === this.tasks.length : false
      },
      set: function(value) {
        const ids = []
        if (value && this.tasks) {
          this.tasks.forEach(task => { ids.push(task.id) })
        }
        this.ids = ids
        this.$emit('onCheckbox', ids)
      }
    }
  },
  methods: {
    onDelete(task) {
      this.$emit('onDelete', task)
    },
    onEdit(task) {
      this.$emit('onEdit', task)
    }
  }
}
</script>
