<template>
  <div class="row">
    <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-12 grid-b-space">
      <app-card customClasses="grid-b-space" :showFooter="tasks.data" :showHeading="true">
        <div slot="card-heading" class="d-flex justify-content-start align-items-center">
          <search-box :search="search" @onSearch="handleSearchTask" />
        </div>
        <task-list :tasks="tasks.data" />
        <div slot="card-footer" class="d-flex justify-content-between">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TaskList from 'Components/Widgets/TaskList'
export default {
  components: {
    TaskList
  },
  data() {
    return {
      search: '', // search box keyword
      length: 10, // data table length
      page: 1
    }
  },
  computed: {
    ...mapState({
      tasks: state => state.tasks.tasks
    })
  },
  created() {
    const { length } = this
    this.$store.dispatch('tasks/getAllTasks', { length })
  },
  methods: {
    onPageChanged(page) {
      const { length, search } = this
      this.page = page
      this.$store.dispatch('tasks/getAllTasks', { page, search, length })
    },
    handleSearchTask(search) {
      const { length } = this
      this.search = search
      this.page = 1
      this.$store.dispatch('tasks/getAllTasks', { search, length })
    },
    changeDataTableLength(length) {
      this.search = ''
      this.page = 1
      this.length = length
      this.$store.dispatch('tasks/getAllTasks', { length })
    }
  }
}
</script>

