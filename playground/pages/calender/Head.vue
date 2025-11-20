<script lang='ts' setup>
defineProps<{
  year: number
  month: number
  day: number
}>()

const emits = defineEmits<{
  (e: 'addMonth'): void
  (e: 'decreaseMonth'): void
}>()
</script>

<template>
  <header flex gap-5 h-15 items-center>
    <div flex gap-5 items-center>
      <Btn icon="i-carbon:arrow-left" @click="emits('decreaseMonth')" />
      <Btn icon="i-carbon:arrow-right" @click="emits('addMonth')" />
      {{ month }}
    </div>
  </header>
</template>

<style scoped></style>
