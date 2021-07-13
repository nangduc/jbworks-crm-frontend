<template>
  <div class="user-import-form">
    <b-modal v-model="open" size="lg" hide-footer centered :title="$t('message.import')" @hide="closeDialog">
      <div class="box mb-4">
        <div class="header">
          <div class="subtitle p-3">
            {{ $t('message.quicklyImportFromExcel') }} (
            <a href="#" class="text-primary" @click="handleDownloadExcelTemplate">
              {{ $t('message.viewTemplate') }}
            </a>)
          </div>
        </div>
        <div class="content">
          <ul class="list-group pl-3">
            <li class="list-group-item border-0 p-1">1. {{ $t("message.firstNote") }}</li>
            <li class="list-group-item border-0 p-1">2. {{ $t("message.secondNote") }}</li>
            <li class="list-group-item border-0 p-1">3. {{ $t("message.thirdNote") }}</li>
          </ul>
        </div>
      </div>
      <div class="d-block p-1">
        <b-form @submit.prevent="onSave">
          <b-form-group label="Choose Excel file">
            <b-form-file size="sm" @change="onFileChange" />
          </b-form-group>
          <div v-if="errors" class="import-errors">
            <div v-for="(error) in Object.entries(errors)" :key="error[0]" class="row-error">
              <div>Row {{ +error[0] }}</div>
              <div v-for="message in error[1]" :key="message.id" class="validate-error">{{ message }}</div>
            </div>
          </div>
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
      import_file: '',
      errors: []
    }
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
    },
    onFileChange(e) {
      this.import_file = e.target.files[0]
    },
    onSave() {
      const formData = new FormData()
      formData.append('import_file', this.import_file)
      this.$store.dispatch('users/importUsers', formData)
        .then(() => {
          this.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.createdSuccessfully')
          })
        }).catch(error => {
          console.log('errorsss', error)
          if (error.status === 422) {
            this.errors = error.data
          }
        })
    },
    handleDownloadExcelTemplate() {
      this.$store.dispatch('users/downloadTemplate').then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response]))
        var fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', 'user_import.xlsx')
        document.body.appendChild(fileLink)

        fileLink.click()
        document.body.removeChild(fileLink)
      })
    }
  }
}
</script>

<style scoped>
.import-errors {
  margin-top: 20px;
}
.row-error {
  margin-top: 10px;
}
.validate-error {
    margin-top: 5px;
    color: red;
}
</style>
