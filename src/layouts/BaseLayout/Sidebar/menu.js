export default {
  routes: [
    {
      menu_title: 'message.dashboard',
      menu_icon: 'zmdi zmdi-view-dashboard',
      path: '/dashboard',
      active: true,
      child_routes: null
    },
    {
      menu_title: 'message.departments',
      menu_icon: 'zmdi zmdi-apps',
      path: '/departments',
      active: false,
      child_routes: null
    },
    {
      menu_title: 'message.opportunityReport',
      menu_icon: 'zmdi zmdi-archive',
      active: false,
      child_routes: [
        {
          route_name: 'task',
          path: '/tasks',
          menu_title: 'message.opportunityReportList'
        },
        {
          route_name: 'task-types',
          path: '/task-types',
          menu_title: 'message.taskType'
        }
      ]
    },
    {
      menu_title: 'message.customers',
      menu_icon: 'zmdi zmdi-assignment',
      path: '/customers',
      active: false,
      child_routes: null
    },
    {
      menu_title: 'message.companion',
      menu_icon: 'zmdi zmdi-face',
      path: '/companion',
      active: false,
      child_routes: null
    },
    {
      menu_title: 'message.reports',
      menu_icon: 'zmdi zmdi-chart',
      path: '/reports',
      active: false,
      child_routes: null
    },
    {
      menu_title: 'message.platformAdministration',
      menu_icon: 'zmdi zmdi-accounts',
      active: false,
      child_routes: [
        {
          route_name: 'users',
          path: '/users',
          child_icon: 'zmdi zmdi-accounts',
          menu_title: 'message.users'
        },
        {
          route_name: 'roles',
          path: '/roles',
          menu_title: 'message.rolesAndPermissions'
        },
        {
          route_name: 'logs',
          path: '/logs',
          menu_title: 'message.activityLogs'
        }
      ]
    }
  ]
}
