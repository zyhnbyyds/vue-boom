<script lang='ts' setup>
import { ref } from 'vue'
import Comment from '~/components/Comment.vue'
import EmojiPicker from '~/components/EmojiPicker.vue'

const visible = ref(true)
const loading = ref(false)
</script>

<template>
  <div w-50>
    <EmojiPicker v-model="visible" />

    <Comment :loading="loading" />
  </div>
</template>

<style scoped></style>
