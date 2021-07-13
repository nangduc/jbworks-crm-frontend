import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: require('../views/login').default
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { layout: 'base-layout' },
    component: () => import('../views/dashboard')
  },
  {
    path: '/users',
    name: 'users',
    meta: { layout: 'base-layout', breadcrumb: 'message.usersUsersList' },
    component: () => import('../views/users')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    meta: { layout: 'base-layout' },
    component: () => import('../views/profile')
  },
  {
    path: '/roles',
    name: 'roles',
    meta: { layout: 'base-layout', breadcrumb: 'message.platformAdministrationRoleAndPermission' },
    component: () => import('../views/acl/roles')
  },
  {
    path: '/roles/create',
    name: 'create-role',
    meta: { layout: 'base-layout' },
    component: () => import('../views/acl/create')
  },
  {
    path: '/roles/edit/:id',
    name: 'edit-role',
    meta: { layout: 'base-layout' },
    component: () => import('../views/acl/edit')
  },
  {
    path: '/departments',
    name: 'departments',
    meta: { layout: 'base-layout', breadcrumb: 'message.departmentsDepartmentsList' },
    component: () => import('../views/departments')
  },
  {
    path: '/department/:id',
    name: 'department',
    meta: { layout: 'base-layout' },
    component: () => import('../views/department-detail')
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: { layout: 'base-layout', breadcrumb: 'message.tasksTasksList' },
    component: () => import('../views/tasks')
  },
  {
    path: '/user/:userId/task/:taskId',
    name: 'task-detail',
    meta: { layout: 'base-layout' },
    component: () => import('../views/task-detail'),
    children: [
      {
        name: 'task',
        path: '',
        component: () => import('../views/task-detail/task-detail'),
        meta: { layout: 'base-layout' }
      }
    ]
  },
  {
    path: '/customers',
    name: 'customers',
    meta: { layout: 'base-layout', breadcrumb: 'message.customersCustomersList' },
    component: () => import('../views/customers')
  },
  {
    path: '/customer/:id',
    name: 'customer',
    meta: { layout: 'base-layout', breadcrumb: 'message.customersCustomerDetail' },
    component: () => import('../views/customer-detail')
  },
  {
    path: '/companion',
    name: 'companion',
    meta: { layout: 'base-layout', breadcrumb: 'message.companion' },
    component: () => import('../views/companion')
  },
  {
    path: '/task-types',
    name: 'task-types',
    meta: { layout: 'base-layout', breadcrumb: 'message.taskType' },
    component: () => import('../views/task-types')
  },
  {
    path: '/logs',
    name: 'logs',
    meta: { layout: 'base-layout', breadcrumb: 'message.activityLog' },
    component: () => import('../views/logs')
  },
  {
    path: '/reports',
    name: 'reports',
    meta: { layout: 'base-layout', breadcrumb: 'message.reportsSaleReports' },
    component: () => import('../views/reports')
  },
  {
    path: '/report/:id',
    name: 'report',
    meta: { layout: 'base-layout' },
    component: () => import('../views/reports'),
    children: [
      {
        name: 'report',
        path: '',
        component: () => import('../views/reports/report-detail'),
        meta: { layout: 'base-layout' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
