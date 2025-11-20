<script lang='ts' setup>
import { ref } from 'vue'
import { emojiList } from '../config/emoji'

const emits = defineEmits<{
  (event: 'select', url: string): void
}>()

const pickerVisible = defineModel<boolean>({ default: false })
const pickerRef = ref<HTMLElement>()

onClickOutside(pickerRef, () => {
  pickerVisible.value = false
})
function hdImgUrl(name: string) {
  if (process.env.NODE_ENV === 'production') {
    return `/node_modules/vue-boom/dist/assets/emojis/${name}`
  }
  return new URL(`../../assets/emojis/${name}`, import.meta.url).href
}
</script>

<template>
  <div ref="pickerRef" flex select-none items-center relative>
    <slot />
    <Transition name="fade">
      <div v-if="pickerVisible" class="top-100%" bg-light-2 dark:bg-dark-5 mt5 p-2 rounded-md shadow-md left-0 absolute z-100>
        <div max-h-60 w-84 overflow-auto>
          <div v-for="item in emojiList" :key="item" hover:bg-light7 dark:hover:bg-dark-9 rounded-1.5 cursor-pointer transition-all class="inline-flex h-10 w-10 items-center justify-center" @click="emits('select', hdImgUrl(item))">
            <img :src="hdImgUrl(item)" h-6.5 w-6.5 :alt="item">
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
