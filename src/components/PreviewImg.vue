<script lang='ts' setup>
import type { CSSProperties, Reactive } from 'vue'
import type { PreviewImgInfo } from '../types/previewImg'
import { inject, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { previewKey } from '../constant'

const { src, active = false } = defineProps<{
  src: string
  active?: boolean
}>()

const emits = defineEmits<{
  select: [name: string]
}>()

const imgRef = ref<HTMLImageElement | null>(null)
const boxRef = ref<HTMLDivElement | null>(null)

const { height: wHeight, width: wWidth } = useWindowSize()
const previewRefStyle = ref<CSSProperties | null>(null)
const previewInfo = inject<Reactive<PreviewImgInfo>>(previewKey, reactive<any>({}))
const { x, y, height, width } = useElementBounding(imgRef)
const { x: boxX, y: boxY, height: boxHeight, width: boxWidth } = useElementBounding(boxRef)
const bHeight = ref(0)

onClickOutside(imgRef, async () => {
  if (!previewInfo.visible || previewInfo.floating)

    return
  previewInfo.visible = false
})

watch(() => previewInfo.visible, async (val) => {
  if (!val) {
    await calculatePosition(true)
  }
  else {
    await calculatePosition()
  }
})

async function calculatePosition(back = false) {
  if (!imgRef.value || !active)
    return
  const centerX = wWidth.value / 2
  const centerY = wHeight.value / 2
  const left = back ? boxX.value : x.value
  const top = back ? boxY.value : y.value
  const h = back ? boxHeight.value : height.value
  const w = back ? boxWidth.value : width.value
  let scale = 1

  function calculateStart() {
    if (!back) {
      bHeight.value = h
    }
    previewRefStyle.value = {
      transform: `translate(${left}px, ${top}px) scale(${scale})`,
      height: `${h}px`,
      width: `${w}px`,
    }
  }

  function calculateEnd() {
    scale = Math.min(wWidth.value * 0.8 / w, wHeight.value * 0.8 / h)
    const translateX = centerX - w / 2
    const translateY = centerY - h / 2

    previewRefStyle.value = {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      height: `${h}px`,
      width: `${w}px`,
    }
  }

  if (!back) {
    calculateStart()
    await nextTick()
    calculateEnd()
  }
  else {
    calculateStart()
  }
}

function hdClickPreview() {
  if (previewInfo.floating) {
    return
  }
  emits('select', src)
  previewInfo.visible = true
}

onBeforeUnmount(() => {
  previewInfo.visible = false
})
</script>

<template>
  <div w-full :style="{ height: (active && previewInfo.floating) ? `${bHeight}px` : '' }" relative>
    <Teleport to="#previewImg" :disabled="!previewInfo.floating || !active">
      <img
        ref="imgRef"
        :style="{ ...(active && previewInfo.floating) ? previewRefStyle : {}, ...{ transitionDuration: `${previewInfo.duration}ms` } }"
        :src="src ?? ''"
        :alt="src ?? ''"
        w-full
        loading="lazy"
        :class="(active && previewInfo.floating) ? 'absolute' : ''"
        cursor-pointer
        rounded-md transition-all provider="minio" @click="hdClickPreview"
      >
    </Teleport>
    <div v-if="(active && previewInfo.floating)" ref="boxRef" :style="{ height: `${bHeight}px` }" invisible w-full inline-flex />
  </div>
</template>

<style scoped></style>
