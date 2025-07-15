<script lang='ts' setup>
defineProps<{
  label?: string
  icon?: string
}>()
</script>

<template>
  <button :class="[icon ? 'p2 rounded-full flex items-center justify-center' : ' px-4 py-2 rounded-lg']" class="h-auto cursor-pointer select-none  text-3.5 text-white transition-colors active:bg-blue-700 hover:bg-blue-600 bg-blue-500 self-start">
    <slot v-if="!icon">
      {{ label }}
    </slot>
    <span v-else class="bg-white h5 w5" :class="[icon]" />
  </button>
</template>

<style scoped></style>
