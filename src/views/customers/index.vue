<template>
  <div class="customer-list-wrapper">
    <!-- <div class="d-flex align-items-center justify-content-between  float-right">
      <div class="project-icon float-right">
        <b-button class="btn-icon" :class="{active: selectedView == 'grid'}" @click="gridView()">
          <i class="zmdi zmdi-apps" />
        </b-button>
        <b-button class="btn-icon" :class="{active: selectedView == 'list'}" @click="listView()">
          <i class="zmdi zmdi-view-list-alt icon" />
        </b-button>
      </div>
    </div> -->
    <!-- <div class="clearfix" /> -->
    <div class="row align-items-stretch">
      <div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
        <app-card custom-classes="grid-b-space" :showFooter="customers.data" :showHeading="true">
          <div slot="card-heading" class="d-flex justify-content-start align-items-center">
            <create-button @onCreate="openDialog" />
            <search-box class="ml-5" :search="search" @onSearch="handleSearchCustomer" />
          </div>
          <grid-view v-if="selectedView == 'grid'" :customers="customers.data" @onEdit="openDialog" />
          <!-- <tree-view v-else /> -->
          <div slot="card-footer" class="d-flex justify-content-between">
            <pagination
              v-if="customers.meta && customers.meta.last_page > 1"
              :totalRow="customers.meta.total"
              :perPage="customers.meta.per_page"
              :page="page"
              @onChangePage="onPageChanged"
            />
          </div>
        </app-card>
      </div>
    </div>
    <customer-form ref="customerForm" />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import GridView from './grid-view'
import CustomerForm from './components/CustomerForm'
// import TreeView from './tree-view'
export default {
  name: 'customers',
  components: {
    GridView,
    // TreeView
    CustomerForm
  },
  data() {
    return {
      selectedView: 'grid',
      search: '', // search box keyword,
      length: 12,
      page: 1 // current page
    }
  },
  computed: {
    ...mapGetters({
      customers: 'customers/customers'
    })
  },
  created() {
    const { length } = this
    Promise.all([
      this.$store.dispatch('customers/getAllCustomers', { length }),
      this.$store.dispatch('customers/getCustomersForSelectBox', { length: 100 }),
      this.$store.dispatch('fields/getAllFields')
    ])
  },
  methods: {
    listView() {
      this.selectedView = 'list'
    },
    gridView() {
      this.selectedView = 'grid'
    },
    openDialog(customer) {
      if (customer) {
        this.$store.dispatch('customers/getCustomer', customer.id).then(() => {
          this.$refs.customerForm.editingCustomer(customer)
        })
      }
      this.$refs.customerForm.openDialog()
    },
    onPageChanged(page) {
      const { search, length } = this
      this.page = page
      this.$store.dispatch('customers/getAllCustomers', { page, search, length })
    },
    handleSearchCustomer(search) {
      const { length } = this
      this.search = search
      this.page = 1
      this.$store.dispatch('customers/getAllCustomers', { search, length })
    }
  }
}
</script>

<style scoped lang='scss'>
.paginate {
  width: 100%;
}
</style>
