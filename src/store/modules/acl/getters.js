import i18n from '@/lang'

export default {
  permissionsViaRole: state => {
    if (state.permissions && state.role.permissions) {
      const permissionsViaRole = state.role.permissions.map(permission => ({ ...permission, checked: true }))
      var permissions = state.permissions.map(obj => permissionsViaRole.find(o => o.name === obj.name) || obj)

      const newPermissions = permissions.map(permission => {
        const dotIndex = permission.name.indexOf('.')
        const group = permission.name.substr(0, dotIndex)
        if (permission.name.includes(group)) {
          return {
            group,
            ...permission
          }
        }
      })

      const map = new Map()
      newPermissions.forEach(({ group, id, name, checked }) => {
        const dotIndex = name.indexOf('.')
        map.has(group) || map.set(group, { name: i18n.t(`message.${group}`), children: [] })
        map.get(group).children.push({
          id,
          name: i18n.t(`message.${name.substr(dotIndex + 1)}`),
          data: { permission: name },
          state: { checked }})
      })

      const result = [{
        name: 'All permission',
        state: { expanded: true },
        children: [...map.values()]
      }]

      return result
    }
  },
  permissions: state => {
    const newPermissions = state.permissions.map(permission => {
      const dotIndex = permission.name.indexOf('.')
      const group = permission.name.substr(0, dotIndex)

      if (permission.name.includes(group)) {
        return {
          group,
          ...permission
        }
      }
    })

    const map = new Map()
    newPermissions.forEach(({ group, id, name }) => {
      const dotIndex = name.indexOf('.')
      map.has(group) || map.set(group, { name: i18n.t(`message.${group}`), children: [] })
      map.get(group).children.push({
        id,
        name: i18n.t(`message.${name.substr(dotIndex + 1)}`),
        data: { permission: name }
      })
    })

    const result = [{
      name: 'All permission',
      state: { expanded: true },
      children: [...map.values()]
    }]

    return result
  },
  rolesSelectBox: state => {
    return state.rolesSelectBox
  }
}
