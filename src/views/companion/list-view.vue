<template>
  <div class="table-responsive">
    <table class="table table-striped custom-table">
      <thead>
        <tr>
          <th>
            <div class="custom-control custom-checkbox">
              <input id="__BVID__56" v-model="selectAll" type="checkbox" class="custom-control-input">
              <label class="custom-control-label" for="__BVID__56" />
            </div>
          </th>
          <th>{{ $t('message.id') }}</th>
          <th>{{ $t('message.avatar') }}</th>
          <th>{{ $t('message.companion') }}</th>
          <th>{{ $t('message.createDate') }}</th>
          <th>{{ $t('message.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="companion in companions" :key="companion.id">
          <td>
            <b-form-checkbox v-model="ids" :value="companion.id" />
          </td>
          <td>#{{ companion.id }}</td>
          <td>
            <img class="img-fluid rounded-circle user-img" :src="companion.avatar" width="40" height="40">
          </td>
          <td>{{ companion.name }}</td>
          <td>{{ companion.created_at ? $dayjs(companion.created_at).locale($i18n.locale).format('L') : '' }}</td>
          <td class="table-action d-flex">
            <a href="javascript:;" class="icon-btn text-primary" @click="onEdit(companion)">
              <i class="zmdi zmdi-edit" />
            </a>
            <a href="javascript:;" class="icon-btn text-danger" @click="onDelete(companion)">
              <i class="zmdi zmdi-delete" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { companionData } from 'Assets/data/Companion.js'
export default {
  props: {
    companions: { type: Array, default: () => [] }
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
        return this.companions ? this.ids.length === this.companions.length : false
      },
      set: function(value) {
        const ids = []
        if (value && this.companions) {
          this.companions.forEach(companion => { ids.push(companion.id) })
        }
        this.ids = ids
        this.$emit('onCheckbox', ids)
      }
    }
  },
  methods: {
    onDelete(companion) {
      this.$emit('onDelete', companion)
    },
    onEdit(companion) {
      this.$emit('onEdit', companion)
    }
  }
}
</script>
