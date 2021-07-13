<template>
  <div class="report-form">
    <b-modal v-model="open" size="md" hide-footer centered :title="$t('message.reports')" @hide="closeDialog">
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <b-form-group :label="$t('message.reportDate')">
            <v-date-picker v-model="data.date" :locale="$i18n.locale">
              <template v-slot="{ inputValue, inputEvents }">
                <b-form-input
                  :value="inputValue"
                  :placeholder="$t('message.reportDate')"
                  v-on="inputEvents"
                />
                <b-form-invalid-feedback v-for="(error, i) in errors.birthday" :key="i">
                  {{ errors.birthday[i] }}
                </b-form-invalid-feedback>
              </template>
            </v-date-picker>
          </b-form-group>
          <b-form-group :label="$t('message.otherReports')">
            <b-form-textarea v-model="data.content" :placeholder="$t('message.otherReports')" />
          </b-form-group>
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
export default {
  data() {
    return {
      open: false,
      isEditing: false,
      data: {
        date: new Date(),
        content: '',
        user_id: +this.$route.params.id
      },
      errors: {}
    }
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
    },
    onSave() {
      const data = {
        ...this.data,
        date: this.$dayjs(this.data.date).format('YYYY-MM-DD')
      }
      this.$store.dispatch('reports/createReport', data)
        .then(response => {
          console.log('response', response)
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
    }
  }
}
</script>

