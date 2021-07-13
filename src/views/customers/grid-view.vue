<template>
  <div class="clients-list-wrap ">
    <div class="row">
      <div
        v-for="(customer, index) in customers"
        :key="index"
        class="mb-30 col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <app-card custom-classes="mb-0 client-item">
          <div :key="index" class="text-center position-relative">
            <router-link :to="{name: 'customer', params: {id: customer.id}}" tag="div" class="thumb-wrap mb-3 client-link">
              <img :src="customer.image" class="rounded-lg customer-logo">
            </router-link>
            <div class="client-content">
              <router-link :to="{name: 'customer', params: {id: customer.id}}" tag="h4" class="mb-2 text-primary client-link">{{ customer.name }}</router-link>
              <div class="contact-links text-truncate mb-1 fs-14">
                <a class="" href="javascript:void(0)">{{ customer.email }}</a>
              </div>
              <div class="contact-links fs-14 text-truncate mb-1">
                <a class="" href="javascript:void(0)">{{ customer.phone }}</a>
              </div>
            </div>
            <div class="action-btn-wrap">
              <b-button class="border-0" @click="showDeleteConfirmation(customer)"><i class="material-icons">delete</i></b-button>
              <b-button class="border-0" @click="onEdit(customer)"><i class="material-icons">edit</i></b-button>
            </div>
          </div>
        </app-card>
      </div>
    </div>
    <delete-confirmation-dialog
      ref="deleteConfirmationDialog"
      :heading="$t('message.confirmDelete')"
      :message="message"
      @onConfirm="handleDeleteCustomer"
    />
  </div>
</template>

<script>

export default {
  name: 'grid-view',
  props: {
    customers: { type: Array, required: true, default: () => [] }
  },
  data() {
    return {
      message: '',
      ids: []
    }
  },
  methods: {
    showDeleteConfirmation(customer) {
      if (customer) this.ids = [customer.id]
      if (this.ids.length) {
        if (this.ids.length > 1) this.message = this.$t('message.doYouReallyWantToDeleteSelectedRecords')
        else this.message = this.$t('message.doYouReallyWantToDeleteThisRecord')
        this.$refs.deleteConfirmationDialog.openDialog()
      }
    },
    handleDeleteCustomer() {
      const { ids } = this
      if (ids.length) {
        this.$store.dispatch('customers/softDeleteCustomer', ids).then(() => {
          this.$refs.deleteConfirmationDialog.closeDialog()
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 5000,
            title: this.$t('message.success'),
            text: this.$t('message.deletedSuccessfully')
          })
        })
      }
    },
    onEdit(customer) {
      this.$emit('onEdit', customer)
    }
  }
}
</script>

<style scoped>
  .client-link {
    cursor: pointer;
  }
  .customer-logo {
    width: 100px;
  }
</style>
