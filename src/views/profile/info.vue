<template>
  <div>
    <app-card custom-classes="grid-b-space">
      <div class="profile-view">
        <div class="row">
          <div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">
            <div class="avatar-wrap pos-relative d-inline-block">
              <img src="/static/img/user-1.jpg" alt="user thumb" width="100" height="100" class="img-fluid rounded-circle">
            </div>
          </div>
          <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5 border-right">
            <div class="article-text-wrap pr-sm-3 mb-sm-0 mb-4 px-25 text-center text-md-left text-lg-left text-xl-left">
              <h4>{{ user.name }}</h4>
              <p v-if="user.kana_name" class="fs-14 artical-author mb-2">{{ $t('message.kanaName') }}: {{ user.kana_name }}</p>
              <p v-if="user.job_title" class="fs-14 artical-author mb-2">{{ $t('message.jobTitle') }}: {{ user.job_title }}</p>
              <p v-if="user.department" class="fs-14 artical-author mb-2">{{ $t('message.department') }}: {{ user.department.name }}</p>
              <p class="fs-14 artical-author mb-2">{{ $t('message.dateOfJoin') }}: {{ $dayjs(user.created_at).locale($i18n.locale).format('L') }}</p>
              <button type="button" class="btn mb-10 mr-10 btn-warning mt-20" @click="openDialog">{{ $t('message.businessReport') }}</button>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div class="idb-full-block h-100 d-flex flex-column justify-content-between user-profile-widget">
              <div class="user-detail-wrap px-25">
                <div class="py-25 user-info">
                  <ul class="list-unstyled user-contact-info">
                    <li v-if="user.phone">
                      <span><i class="zmdi zmdi-phone-msg" /></span>
                      <span class="fs-14">{{ user.phone }}1</span>
                    </li>
                    <li>
                      <span><i class="zmdi zmdi-email" /></span>
                      <span class="fs-14">{{ user.email }}</span>
                    </li>
                    <li v-if="user.birthday">
                      <span><i class="fa fa-birthday-cake" /></span>
                      <span class="fs-14">{{ $dayjs(user.birthday).locale($i18n.locale).format('L') }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-card>
    <report-form ref="reportForm" />
  </div>
</template>

<script>
import ReportForm from './components/ReportForm.vue'
export default {
  components: { ReportForm },
  props: {
    user: { type: Object, required: true }
  },
  methods: {
    openDialog() {
      this.$refs.reportForm.openDialog()
    }
  }
}
</script>

<style>

</style>
