export default {
  changeLanguageHandler(state, language) {
    state.selectedLocale = language
  },
  toggleCustomizerHandler(state) {
    state.customizer = !state.customizer
  },
  darkModeHandler(state) {
    state.darkMode = !state.darkMode
  },
  rtlLayoutHandler(state) {
    state.rtlLayout = !state.rtlLayout
  },
  changeSidebarFilterHandler(state, payload) {
    state.sidebarSelectedFilter = payload
  },
  collapsedSidebarHandler(state) {
    state.collapsedSidebar = !state.collapsedSidebar
  },
  toggleFullscreenHandler(state, payload) {
    state.fullScreen = !payload
  },
  toggleRightSidebarHandler(state) {
    state.rightSidebar = !state.rightSidebar
  },
  sidebarBgImageHandler(state) {
    state.backgroundImage = !state.backgroundImage
  },
  changeBackgroundImageHandler(state, image) {
    state.selectedSidebarBgImage = image
  }
}
