import { languages, themeColor, sidebarBackgroundImages } from './data'

export default {
  languages,
  selectedLocale: JSON.parse(localStorage.getItem('language')) || languages[1],
  rtlLayout: false, // dark mode
  customizer: false, // customizer
  boxLayout: false, // box layout
  darkMode: false,
  collapsedSidebar: false,
  fullScreen: false,
  rightSidebar: false,
  themeColor,
  sidebarSelectedFilter: themeColor[0],
  backgroundImage: false,
  sidebarBackgroundImages,
  selectedSidebarBgImage: sidebarBackgroundImages[0]
}
