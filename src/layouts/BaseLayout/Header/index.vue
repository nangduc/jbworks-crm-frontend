<template>
  <header class="app-header">
    <div class="d-flex justify-content-between align-items-center nav-wrap">
      <div class="d-flex align-items-center">
        <div class="ham-icon">
          <button type="button" class="c-hamburger c-hamburger--rot  v-step-0" name="button" @click="collapseSidebarHandler">
            <span class="ham-line" />
          </button>
        </div>
        <search-form class="v-step-1" />
        <div class="mobile-search d-none">
          <b-btn class="mobile-search-btn" variant="white">
            <span class="zmdi zmdi-search" />
          </b-btn>
        </div>
      </div>
      <b-navbar-nav class="navbar-right">
        <b-nav-item class="v-step-2 zoom-out" href="#" @click="toggleScreenFull">
          <i class="zmdi zmdi-fullscreen" />
        </b-nav-item>
        <language-provider />
        <user-block />
      </b-navbar-nav>
    </div>
    <!-- <tour :data="tourData"></tour> -->
    <!-- <right-sidebar :sidebar-open="rightSidebar" /> -->
  </header>
</template>

<script>
import SearchForm from './SearchForm.vue'
// import RightSidebar from './RightSidebar'
import LanguageProvider from './LanguageProvider'
import screenfull from 'screenfull'
import { mapGetters } from 'vuex'
import UserBlock from './UserBlock'
export default {
  components: {
    // RightSidebar,
    LanguageProvider,
    SearchForm,
    UserBlock
  },
  computed: {
    ...mapGetters({
      rightSidebar: 'settings/rightSidebar'
    })
  },
  methods: {
    // method to right Sidebar event
    toggleRightSidebar() {
      this.$store.dispatch('settings/toggleRightSidebar')
    },
    // method to screenFull event
    toggleScreenFull() {
      this.$store.dispatch('settings/toggleFullscreen', screenfull.isFullscreen)
      screenfull.toggle()
    },
    // method to collapsedSidebar event
    collapseSidebarHandler() {
      if (window.innerWidth < 1265) {
        document.querySelector('.app-container').classList.remove('collapsed-sidebar')
        document.querySelector('.sidebarOverlay').classList.add('active')
      } else {
        this.$store.dispatch('settings/collapsedSidebar')
      }
    }
  }
}
</script>

<style></style>
