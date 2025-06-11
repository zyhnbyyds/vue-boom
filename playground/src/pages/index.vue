<script lang='ts' setup>
import { ref } from 'vue'
import { Comment } from 'vue-boom'

const loading = ref(false)
</script>

<template>
  <div w-50>
    <Comment :loading="loading" />
  </div>
</template>

<style scoped></style>
