<template>
  <div v-if="showHeading" class="idb-block-title" :class="blockTitleClass">
    <slot />
    <!-- <template v-if="heading">
        <h4 :class="headingColor">
          {{ heading }}
        </h4>
      </template>
      <template v-if="!withTabs">
        <div v-if="headingMenu" class="idb-contextual-link">
          <b-dropdown variant="link" no-caret right text="Right align">
            <template slot="button-content">
              <i class="zmdi zmdi-more" />
            </template>
            <b-dropdown-item @click="$emit('onCollapse')">
              <i class="zmdi zmdi-fullscreen text-primary" />
              {{ 'Full Screen' }}
            </b-dropdown-item>
            <b-dropdown-item @click="$emit('onReload')">
              <i class="zmdi zmdi-refresh text-success" />
              {{ 'Reload' }}
            </b-dropdown-item>
            <b-dropdown-item @click="$emit('onClose')">
              <i class="zmdi zmdi-close text-danger" />
              {{ 'Close' }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
      </template> -->
  </div>
</template>

<script>
export default {
  props: [
    'showHeading',
    'heading',
    'headingColor',
    'headingMenu',
    'closeable',
    'reloadable',
    'blockTitleClass',
    'fullScreen',
    'onCollapse',
    'onReload',
    'onClose',
    'withTabs',
    'tabs',
    'onChangeTabCallback'
  ],
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    onChangeTab(value) {
      this.activeTab = value
      this.$emit('onChangeTabCallback', value)
    }
  }
}
</script>
