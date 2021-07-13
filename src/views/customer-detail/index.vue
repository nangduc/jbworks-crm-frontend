<template>
  <div class="customer-detail-wrapper">
    <div class="row">
      <div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
        <app-card custom-classes="grid-b-space">
          <div class="row mb-3">
            <div class="col-md-6 col-lg-5 col-xl-5">
              <div class="user-profile-block">
                <div class="thumb-wrap mb-3 client-link text-center">
                  <img :src="customer.image" class="rounded-lg customer-image">
                </div>
                <div class="address-block px-20">
                  <span class="font-sm d-block mb-10"><i class="zmdi zmdi-account" />{{ customer.representative }}</span>
                  <span class="font-sm d-block mb-10"><i class="zmdi zmdi-email" />{{ customer.email }}</span>
                  <span class="font-sm d-block mb-10"><i class="zmdi zmdi-phone" />{{ customer.phone }}</span>
                  <span class="font-sm d-block mb-10"><i class="zmdi zmdi-pin" />{{ customer.address }}</span>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-4 amount-sec-wrap mb-md-0 mb-4">
              <ul class="list-inline mb-3 amount-list">
                <li class="border-bottom py-3 d-flex align-items-center">
                  <span class="text-muted mr-3 w-60">{{ $t('message.companyName') }}:</span>
                  <h6 class="mb-0">{{ customer.name }}</h6>
                </li>
                <li class="border-bottom py-3 d-flex align-items-center">
                  <span class="text-muted mr-3 w-60">{{ $t('message.companyKanaName') }}:</span>
                  <h6 class="mb-0">{{ customer.kana_name }}</h6>
                </li>
                <li class="border-bottom py-3 d-flex align-items-center">
                  <span class="text-muted mr-3 w-60">{{ $t('message.companyMainName') }}:</span>
                  <h6 class="mb-0">{{ customer.business_name }}</h6>
                </li>
                <li class="border-bottom py-3 d-flex align-items-center">
                  <span class="text-muted mr-3 w-60">{{ $t('message.companyShortName') }}:</span>
                  <h6 class="mb-0">{{ customer.short_name }}</h6>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-3">
            <h6 class="mb-3">{{ $t('message.remark') }}:</h6>
            <p class="mb-3">
              <i class="material-icons text-muted">subjects</i>{{ customer.remark }}
            </p>
          </div>
          <!-- <div class="mb-3 d-flex">
            <h6 class="mb-3 mr-2">{{ $t('message.taskCompletedCount') }}:</h6>
            <h6 class="mb-0">3</h6>
          </div> -->
          <task-list
            :tasks="tasks.data"
            :showCustomerColumn="false"
          />
          <div class="d-flex justify-content-between">
            <data-table-length :length="length" @onChangeDataTableLength="changeDataTableLength" />
            <pagination
              v-if="tasks.meta && tasks.meta.last_page > 1"
              :totalRow="tasks.meta.total"
              :perPage="tasks.meta.per_page"
              :page="page"
              @onChangePage="onPageChanged"
            />
          </div>
        </app-card>
      </div>
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-3 col-xl-3">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <app-card custom-classes="grid-b-space" :full-block="true" content-custom-class="text-center user-profile-block">
              <div class="py-20">
                <div v-for="field in fields" :key="field.id" class="d-flex align-items-center task-wrap py-2">
                  <div class="mr-20">
                    <label class="custom-control custom-checkbox m-0">
                      <input v-for="item in customer.fields" :key="item.id" type="checkbox" class="custom-control-input" disabled :checked="field.id === item.id">
                      <span class="custom-control-indicator" />
                    </label>
                  </div>
                  <h6 class="mb-0">{{ field.name }}</h6>
                </div>
              </div>

            </app-card>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-12 col-xl-12">
            <app-card custom-classes="peoples grid-b-space">
              <div>
                <ul>
                  <li class="p-3 border-bottom d-flex justify-content-between align-content-center">
                    <span class="fw-light text-capitalize fs-14 pr-10">{{ $t('message.founding') }} :</span>
                    <span class="fw-semi-bold text-capitalize fs-14">{{ customer.founding ? $dayjs(customer.founding).locale($i18n.locale).format('L') : '' }}</span>
                  </li>
                  <li class="p-3 border-bottom d-flex justify-content-between align-content-center">
                    <span class="fw-light text-capitalize fs-14 pr-10">{{ $t('message.charterCapital') }} :</span>
                    <span class="fw-semi-bold text-capitalize fs-14">{{ customer.charter_capital }}</span>
                  </li>
                  <li class="p-3 border-bottom d-flex justify-content-between align-content-center">
                    <span class="fw-light text-capitalize fs-14 pr-10">{{ $t('message.numberOfEmployees') }} :</span>
                    <span class="fw-semi-bold text-capitalize fs-14">{{ customer.number_of_employees }}</span>
                  </li>
                </ul>
              </div>
            </app-card>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-12 col-xl-12">
            <app-card custom-classes="peoples grid-b-space">
              <div>
                <ul>
                  <li class="p-3 border-bottom d-flex justify-content-between align-content-center">
                    <span class="fw-light text-capitalize fs-14 pr-10">{{ $t('message.createdAt') }} :</span>
                    <span class="fw-semi-bold text-capitalize fs-14">{{ customer.created_at ? $dayjs(customer.created_at).locale($i18n.locale).format('L') : '' }}</span>
                  </li>
                  <li class="p-3 border-bottom d-flex justify-content-between align-content-center">
                    <span class="fw-light text-capitalize fs-14 pr-10">{{ $t('message.updatedAt') }} :</span>
                    <span class="fw-semi-bold text-capitalize fs-14">{{ customer.updated_at ? $dayjs(customer.updated_at).locale($i18n.locale).format('L') : '' }}</span>
                  </li>
                </ul>
              </div>
            </app-card>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskList from 'Components/Widgets/TaskList'
export default {
  name: 'customer',
  components: {
    TaskList
  },
  data() {
    return {
      length: 5,
      page: 1
    }
  },
  computed: {
    ...mapGetters({
      customer: 'customers/customer',
      fields: 'fields/fields',
      tasks: 'tasks/tasksOfCustomer'
    })
  },
  created() {
    const customerId = this.$route.params.id
    Promise.all([
      this.$store.dispatch('customers/getCustomer', customerId),
      this.$store.dispatch('fields/getAllFields'),
      this.$store.dispatch('tasks/getTasksByCustomerId', { customerId, length: this.length })
    ])
  },
  methods: {
    onPageChanged(page) {
      const customerId = this.$route.params.id
      const { length } = this
      this.page = page
      // this.$store.dispatch('tasks/getTasksByUserId', { userId, page, search, length })
      this.$store.dispatch('tasks/getTasksByCustomerId', { customerId, page, length })
    },
    changeDataTableLength(length) {
      const customerId = this.$route.params.id
      this.length = length
      this.search = ''
      this.page = 1
      // this.$store.dispatch('tasks/getTasksByUserId', { userId, length })
      this.$store.dispatch('tasks/getTasksByCustomerId', { customerId, length })
    }
  }
}
</script>

<style scoped>
.customer-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: center
}
</style>
