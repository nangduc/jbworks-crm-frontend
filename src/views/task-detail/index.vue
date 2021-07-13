<template>
  <div class="user-profile-wrapper">
    <div class="row">
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-3 col-xl-3">
        <tasks :tasks="tasksOfUser" />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tasks from './tasks'
export default {
  name: 'task',
  components: {
    Tasks
  },
  computed: {
    ...mapGetters({
      tasksOfUser: 'tasks/tasksOfUser'
    })
  },
  watch: {
    $route(to, from) {
      const { taskId } = to.params
      Promise.all([
        this.$store.dispatch('taskDetail/getTask', taskId),
        this.$store.dispatch('taskProgresses/getTaskProgressesByTaskId', { taskId, length: 10 })
      ])
    }
  },
  created() {
    const { userId, taskId } = this.$route.params
    Promise.all([
      this.$store.dispatch('tasks/getTasksByUserId', { userId, length: 10 }),
      this.$store.dispatch('taskDetail/getTask', taskId),
      this.$store.dispatch('taskProgresses/getTaskProgressesByTaskId', { taskId, length: 5 }),
      this.$store.dispatch('saleStatuses/getSaleStatuses'),
      this.$store.dispatch('negotiationStatuses/getNegotiationStatuses'),
      this.$store.dispatch('negotiationResultStatuses/getNegotiationResultStatuses'),
      this.$store.dispatch('accuracies/getAccuracies'),
      this.$store.dispatch('companions/getCompanionsForSelectBox', { length: 10 })
    ])
  }
}
</script>
