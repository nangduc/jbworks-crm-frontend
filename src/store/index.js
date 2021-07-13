import Vue from 'vue'
import Vuex from 'vuex'

import settings from './modules/settings'
import auth from './modules/auth'
import acl from './modules/acl'
import tasks from './modules/tasks'
import users from './modules/users'
import customers from './modules/customers'
import taskGroups from './modules/task-groups'
import taskTypes from './modules/task-types'
import saleStatuses from './modules/sale-statuses'
import negotiationStatuses from './modules/negotiation-statuses'
import accuracies from './modules/accuracies'
import companions from './modules/companions'
import taskDetail from './modules/task-detail'
import taskProgresses from './modules/task-progresses'
import negotiationResultStatuses from './modules/negotiation-result-statuses'
import departments from './modules/departments'
import reports from './modules/reports'
import fields from './modules/fields'
import comments from './modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
    auth,
    acl,
    tasks,
    users,
    customers,
    taskGroups,
    taskTypes,
    saleStatuses,
    negotiationStatuses,
    accuracies,
    companions,
    taskDetail,
    taskProgresses,
    negotiationResultStatuses,
    departments,
    reports,
    fields,
    comments
  }
})
