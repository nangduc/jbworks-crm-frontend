<template>
  <div class="user-section d-flex align-items-center">
    <b-dropdown variant="link" size="md" class="admin-section py-0" width="200px">
      <template slot="button-content">
        <div class="pos-relative d-inline-block">
          <img :src="userInfo.avatar" width="30" height="30" alt="user" class="img-fluid mb-10">
        </div>
      </template>
      <b-dropdown-header class="gradient-primary">
        <span>{{ userInfo.name }}</span>
      </b-dropdown-header>
      <template v-for="(menu, index) in userMenu">
        <b-dropdown-item v-if="menu.name !== 'logout'" :key="index" :to="menu.path">
          <i class="mx-10" :class="[menu.icon, menu.color]" />
          {{ $t(menu.text) }}
        </b-dropdown-item>
        <b-dropdown-item v-else :key="index" @click="handleLogout">
          <i class="mx-10" :class="[menu.icon, menu.color]" />
          {{ $t(menu.text) }}
        </b-dropdown-item>
      </template>
    </b-dropdown>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userMenu: [
        {
          name: 'profile',
          icon: 'ti-user',
          text: 'message.myProfile',
          color: 'text-warning',
          path: '/profile/1'
        },
        {
          name: 'logout',
          icon: 'ti-power-off',
          text: 'message.logout',
          color: 'text-danger',
          path: ''
        }
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.auth.userInfo
    })
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout').then(response => {
        this.$notify({
          group: 'notify',
          type: 'success',
          duration: 5000,
          text: response.message
        })
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>
