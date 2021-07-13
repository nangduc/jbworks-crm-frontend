<template>
  <div v-if="showFooter" class="idb-block-footer" :class="footerClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'app-card-footer',
  props: ['showFooter', 'footerClasses']
}
</script>
