<script lang='ts' setup>
import dayjs from 'dayjs'
import { weekNumToLabelMap } from './config'
import Head from './Head.vue'
import { useCalender } from './useCalender'

const { addMonth, decreaseMonth, year, day, month, days } = useCalender()

const nowDate = computed(() => {
  return dayjs().format('YYYY-M-D')
})

const tagStyle = {
  primary: 'bg-linear-to-rb from-blue-300 bg-op80 to-blue-400 text-white',
  secondary: 'bg-light-700 text-light-400',
  success: 'bg-linear-to-rb from-green-300 bg-op80 to-green-400 text-white',
  warning: 'bg-yellow-4 text-white',
  danger: 'bg-linear-to-rb from-orange-300 bg-op80 to-orange-400 text-orange-300',
  info: 'bg-linear-to-rb from-blue-300 bg-op80 to-blue-400 text-white',
}
</script>

<template>
  <div h-full relative w-full flex-col flex p-3>
    <Head :year="year" :month="month" :day="day" @add-month="addMonth" @decrease-month="decreaseMonth" />
    <div grid="~ cols-7" h-10 gap-2 w-full>
      <div v-for="item in 7" :key="`${item}:week`" class="border text-sm justify-center items-center flex h-10 border rounded-md border-light-700">
        {{ weekNumToLabelMap[item] ?? '周日' }}
      </div>
    </div>

    <div grid="~ cols-7 rows-5 gap-2" flex-1 w-full mt-1 :class="days.length > 35 ? 'grid-rows-6' : 'grid-rows-5'">
      <div
        v-for="item in days" :key="item.date"
        class="border border-light-700 cursor-pointer p3 rounded-md"
        :class="
          [
            nowDate === `${year}-${month}-${item.day}`
              ? 'bg-linear-to-rb from-blue-300 bg-op80 to-blue-400 text-white'
              : 'hover:bg-light4 hover:bg-op60',
            item.isNextMonth || item.isPrevMonth
              ? 'op40 bg-gray-200'
              : '',
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
        <div v-for="event in item.events" :key="`${event.date}:event`" :class="tagStyle.primary" class="bg-gradient-to-bl text-sm px-2 inline rounded-md py-1">
          {{ event.name }}
        </div>
      </div>
    </div>

    <div class="mask absolute left-50% top-50% -translate-x-50% text-nowrap text-45 text-op30 text-gray-200 font-italic -z-1">
      {{ year }} {{ dayjs(`${year}-${month}`).format('MM') }}
    </div>
  </div>
</template>

<style scoped></style>
