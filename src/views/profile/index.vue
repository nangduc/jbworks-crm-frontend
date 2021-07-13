<template>
  <div class="user-profile-wrapper">
    <div class="row">
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <info :user="user" />
      </div>
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
        <app-card
          :heading="$t('message.salesByCategory')"
          :headingMenu="true"
          contentCustomClass="p-0"
          customClasses="salesByCategory-widget overflow-hide"
        >
          <targets-achievements />
        </app-card>
      </div>
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
        <app-card
          :heading="$t('message.calendar')"
          :headingMenu="true"
          contentCustomClass="p-0"
          customClasses="salesByCategory-widget overflow-hide"
        >
          <calendar />
        </app-card>
      </div>
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
        <tasks :tasks="tasksOfUser" :user="user" />
      </div>
    <!--end task-->
    </div>
  </div>
</template>

<script>
import Calendar from 'Components/Widgets/Calendar'
import Tasks from './tasks'
import TargetsAchievements from './targets-achievements'
import Info from './info'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'profile',
  components: {
    Tasks,
    Calendar,
    TargetsAchievements,
    Info
  },
  data() {
    return {
      length: 10,
      open: true
    }
  },
  computed: {
    ...mapGetters({
      tasksOfUser: 'tasks/tasksOfUser'
    }),
    ...mapState({
      user: state => state.users.user
    })
  },
  created() {
    const userId = this.$route.params.id
    Promise.all([
      this.$store.dispatch('tasks/getTasksByUserId', { userId, length: this.length }),
      this.$store.dispatch('users/getUser', userId),
      this.$store.dispatch('customers/getCustomersForSelectBox', { length: 100 }),
      this.$store.dispatch('taskTypes/getTaskTypesForSelectBox'),
      this.$store.dispatch('saleStatuses/getSaleStatuses'),
      this.$store.dispatch('negotiationStatuses/getNegotiationStatuses'),
      this.$store.dispatch('accuracies/getAccuracies'),
      this.$store.dispatch('companions/getCompanionsForSelectBox', { length: 10 })
    ])
  }
}
</script>
