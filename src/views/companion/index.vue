<template>
  <div id="responsive-table">
    <app-card :showFooter="true" :showHeading="true">
      <div slot="card-heading" class="d-flex justify-content-start align-items-center">
        <create-button @onCreate="openDialog" />
        <bulk-delete-button class="ml-2" @onDelete="showDeleteConfirmation" />
        <search-box class="ml-5" :search="search" @onSearch="handleSearch" />
      </div>
      <list-view :companions="companions.data" @onEdit="openDialog" @onDelete="showDeleteConfirmation" @onCheckbox="onCheckbox" />
      <div slot="card-footer" class="d-flex justify-content-between">
        <data-table-length :length="length" @onChangeDataTableLength="changeDataTableLength" />
        <pagination
          v-if="companions.meta && companions.meta.last_page > 1"
          :totalRow="companions.meta.total"
          :perPage="companions.meta.per_page"
          :page="page"
          @onChangePage="onPageChanged"
        />
      </div>
    </app-card>
    <companion-form ref="companionForm" />
    <delete-confirmation-dialog
      ref="deleteConfirmationDialog"
      :heading="$t('message.confirmDelete')"
      :message="message"
      @onConfirm="handleDeleteCompanion"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListView from './list-view'
import CompanionForm from './components/CompanionForm'
export default {
  name: 'companions',
  components: {
    ListView,
    CompanionForm
  },
  data() {
    return {
      length: 10,
      search: '',
      page: 1,
      ids: [],
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      companions: 'companions/companions'
    })
  },
  created() {
    const { length } = this
    this.$store.dispatch('companions/getAllCompanions', { length })
  },
  methods: {
    openDialog(data) {
      if (data) {
        this.$refs.companionForm.editingCompanion(data)
      }
      this.$refs.companionForm.openDialog()
    },
    handleSearch(search) {
      const { length } = this
      this.search = search
      this.page = 1
      this.$store.dispatch('companions/getAllCompanions', { search, length })
    },
    onPageChanged(page) {
      const { search, length } = this
      this.page = page
      this.$store.dispatch('companions/getAllCompanions', { page, search, length })
    },
    changeDataTableLength(length) {
      this.length = length
      this.search = ''
      this.page = 1
      this.$store.dispatch('companions/getAllCompanions', { length })
    },
    onCheckbox(ids) {
      this.ids = ids
    },
    showDeleteConfirmation(companion) {
      if (companion) this.ids = [companion.id]
      if (this.ids.length) {
        if (this.ids.length > 1) this.message = this.$t('message.doYouReallyWantToDeleteSelectedRecords')
        else this.message = this.$t('message.doYouReallyWantToDeleteThisRecord')
        this.$refs.deleteConfirmationDialog.openDialog()
      } else {
        this.$notify({
          group: 'notify',
          type: 'warn',
          duration: 5000,
          title: this.$t('message.pleaseSelectAtLeastOneRecordToPerformThisAction')
        })
      }
    },
    handleDeleteCompanion() {
      const { ids } = this
      if (ids.length) {
        this.$store.dispatch('companions/softDeleteCompanion', { ids }).then(() => {
          this.$refs.deleteConfirmationDialog.closeDialog()
          this.ids = []
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.deletedSuccessfully')
          })
        })
      }
    }
  }
}
</script>

