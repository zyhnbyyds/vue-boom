<script lang='ts' setup>
defineProps<{
  label?: string
  icon?: string
  theme?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'empty'
}>()

const classMap = {
  primary: 'bg-blue-500 active:bg-blue-700 hover:bg-blue-600',
  secondary: 'bg-gray-500 active:bg-gray-700 hover:bg-gray-600',
  success: 'bg-green-500 active:bg-green-700 hover:bg-green-600',
  danger: 'bg-red-500 active:bg-red-700 hover:bg-red-600',
  warning: 'bg-yellow-500 active:bg-yellow-700 hover:bg-yellow-600',
  info: 'bg-blue-500 active:bg-blue-700 hover:bg-blue-600',
  empty: 'bg-transparent',
}
</script>

<template>
  <button class="text-3.5 text-white border border-gray-200 h-auto cursor-pointer select-none transition-colors self-start dark:border-dark-400" :class="[icon ? 'p2 rounded-full flex items-center justify-center' : ' px-4 py-2 rounded-lg', classMap[theme ?? 'primary']]">
    <slot v-if="!icon">
      {{ label }}
    </slot>
    <span v-else dark:text-white class="h5 w5" :class="[icon, theme === 'empty' ? 'text-black' : 'text-white']" />
  </button>
</template>

<style scoped></style>
