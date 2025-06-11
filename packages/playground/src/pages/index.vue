<script lang='ts' setup>
import { ref } from 'vue'
import Comment from '~/components/Comment.vue'

const loading = ref(false)
</script>

<template>
  <div w-50>
    <Comment :loading="loading" />
  </div>
</template>

<style scoped></style>
