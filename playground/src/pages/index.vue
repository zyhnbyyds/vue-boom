<script lang='ts' setup>
import { ref } from 'vue'
import { Comment, PreviewImg } from 'vue-boom'

const loading = ref(false)
</script>

<template>
  <div w-50>
    <Comment :loading="loading" />

    <PreviewImg :active="true" src="https://raw.githubusercontent.com/antfu/vscode-iconify/refs/heads/main/screenshots/preview-1.png" />
  </div>
</template>

<style scoped></style>
