<script lang='ts' setup>
import { ref } from 'vue'

const isActive = ref<number | null>(null)

function hdSelect(idx: number) {
  isActive.value = idx
}
</script>

<template>
  <div w-full columns-5>
    <div v-for="i in 100" :key="i" w-full>
      <PreviewImg
        :active="isActive === i"
        src="https://raw.githubusercontent.com/antfu/vscode-iconify/refs/heads/main/screenshots/preview-1.png" @select="hdSelect(i)"
      />
    </div>
  </div>
</template>

<style scoped></style>
