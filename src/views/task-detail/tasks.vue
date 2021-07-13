<template>
  <app-card customClasses="grid-b-space">
    <task-list
      :tasks="tasks.data"
    />
  </app-card>
</template>

<script>
import { table2 } from 'Assets/data/responsiveTable.js'
import TaskList from 'Components/Widgets/TaskList'
export default {
  components: {
    TaskList
  },
  props: {
    tasks: { type: Object, required: true }
  },
  data() {
    return {
      table2
    }
  }
}
</script>
