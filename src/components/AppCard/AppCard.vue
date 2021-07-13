<template>
  <div :class="[customClasses, { 'd-none': close }]" class="idb-block customClasses">
    <fullscreen ref="fullscreen" class="h-100">
      <div class="app-card" :class="appCardClass">
        <app-card-heading
          :showHeading="showHeading"
          :heading="heading"
          :headingColor="headingColor"
          :headingMenu="headingMenu"
          :closeable="closeable"
          :reloadable="reloadable"
          :fullScreen="fullScreen"
          :withTabs="withTabs"
          :tabs="tabs"
          :blockTitleClass="blockTitleClass"
        >
          <slot name="card-heading" />
        </app-card-heading>
        <app-card-content :extra-class="[contentCustomClass]" :full-block="fullBlock">
          <slot />
        </app-card-content>
        <app-card-footer :showFooter="showFooter" :footerClasses="footerClasses">
          <slot name="card-footer" />
        </app-card-footer>
        <app-section-loader :status="reload" />
      </div>
    </fullscreen>
  </div>
</template>

<script>
import AppCardHeading from './AppCardHeading'
import AppCardContent from './AppCardContent'
import AppCardFooter from './AppCardFooter'
import AppSectionLoader from '../AppSectionLoader/AppSectionLoader'

export default {
  components: {
    AppCardHeading,
    AppCardContent,
    AppCardFooter,
    AppSectionLoader
  },
  props: [
    'appCardClass',
    'showHeading',
    'heading',
    'headingColor',
    'headingMenu',
    'customClasses',
    'footerClasses',
    'blockTitleClass',
    'showFooter',
    'fullBlock',
    'contentCustomClass',
    'closeable',
    'reloadable',
    'fullScreen',
    'withTabs',
    'tabs',
    'onChangeTabCallback'
  ],
  data() {
    return {
      reload: false,
      close: false
    }
  },
  methods: {
    onCollapse() {
      this.$refs['fullscreen'].toggle()
    },
    onReload() {
      this.reload = true
      const self = this
      setTimeout(() => {
        self.reload = false
      }, 1500)
    },
    onClose() {
      this.close = true
    },
    onChangeTab(value) {
      this.$emit('onChangeTabCallback', value)
    }
  }
}
</script>
