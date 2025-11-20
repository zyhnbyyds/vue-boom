<script lang='ts' setup>
import dayjs from 'dayjs'
import { weekNumToLabelMap } from './config'
import Head from './Head.vue'
import { useCalender } from './useCalender'

export interface CalenderProp {
  showYear?: boolean
}

const props = withDefaults(defineProps<CalenderProp>(), {
  showYear: true,
})

const { addMonth, decreaseMonth, year, day, month, days } = useCalender()

const nowDate = computed(() => {
  return dayjs().format('YYYY-M-D')
})

const tagStyle = {
  primary: 'bg-linear-to-rb from-blue-300 bg-op80 to-blue-400 text-white dark:from-blue-600 dark:to-blue-700',
  secondary: 'bg-light-700 text-light-400 dark:bg-dark-300 dark:text-dark-600',
  success: 'bg-linear-to-rb from-green-300 bg-op80 to-green-400 text-white dark:from-green-600 dark:to-green-700',
  warning: 'bg-yellow-4 text-white dark:bg-yellow-600 dark:text-yellow-100',
  danger: 'bg-linear-to-rb from-orange-300 bg-op80 to-orange-400 text-orange-300 dark:from-orange-600 dark:to-orange-700 dark:text-orange-200',
  info: 'bg-linear-to-rb from-blue-300 bg-op80 to-blue-400 text-white dark:from-blue-600 dark:to-blue-700',
}
</script>

<template>
  <div p-3 flex flex-col h-full w-full relative>
    <Head :year="year" :month="month" :day="day" @add-month="addMonth" @decrease-month="decreaseMonth" />
    <div grid="~ cols-7" gap-2 h-10 w-full>
      <div
        v-for="item in 7"
        :key="`${item}:week`"
        class="text-sm border border-light-700 rounded-md flex h-10 items-center justify-center dark:text-gray-200 dark:border-dark-300"
      >
        {{ weekNumToLabelMap[item] ?? '周日' }}
      </div>
    </div>

    <div grid="~ cols-7 rows-5 gap-2" mt-1 flex-1 w-full :class="days.length > 35 ? 'grid-rows-6' : 'grid-rows-5'">
      <div
        v-for="item in days" :key="item.date"
        class="p3 border border-light-700 rounded-md min-w-40 transition-colors dark:border-dark-300"
        :class="
          [
            nowDate === `${year}-${month}-${item.day}`
              ? 'bg-linear-to-rb from-blue-300 cursor-pointer bg-op80 to-blue-400 text-white dark:from-blue-600 dark:to-blue-300'
              : item.isNextMonth || item.isPrevMonth
                ? 'op40 bg-gray-200 dark:bg-dark-500 dark:text-gray-500'
                : 'hover:bg-light400 hover:bg-op60 cursor-pointer dark:bg-dark-400 dark:hover:bg-dark-200 dark:text-gray-100',
          ]"
      >
        <div mb1 flex justify-between>
          <span class="select-none">
            {{ item.day }}
          </span>

          <span v-if="item.isNextMonth || item.isPrevMonth" class="">
            {{ dayjs(item.date).format('M') }}
            <span class="text-sm">
              月
            </span>
          </span>
        </div>
        <slot name="day" :day="item">
          <div
            v-for="event in item.events"
            :key="`${event.date}:event`"
            :class="tagStyle.primary"
            class="text-sm px-2 py-1 rounded-md inline bg-gradient-to-bl"
          >
            {{ event.name }}
          </div>
        </slot>
      </div>
    </div>

    <div
      v-if="props.showYear"
      class="mask text-45 text-gray-200 text-stroke-2 text-stroke-gray-400 op30 text-nowrap font-italic left-50% top-50% absolute dark:text-gray-700 dark:text-stroke-gray-600 -translate-x-50% -translate-y-50% -z-1"
    >
      {{ year }} {{ dayjs(`${year}-${month}`).format('MM') }}
    </div>
  </div>
</template>

<style scoped></style>
