import dayjs from 'dayjs'

export interface CalenderEventData {
  $schema: string
  $id: string
  year: number
  papers: string[]
  days: EventDay[]
}

export interface EventDay {
  name: string
  date: string
  isOffDay: boolean
  range?: string[]
}

export interface Day {
  day: number
  date: string
  week: number
  weekDay: number
  isToday: boolean
  isWeekend: boolean
  isPrevMonth?: boolean
  isNextMonth?: boolean
  events?: EventDay[]
}

const { data } = useFetch(`https://zyujie.me/static/${dayjs().format('YYYY')}.json`).json<CalenderEventData>()
export function useCalender() {
  const year = ref(Number.parseInt(dayjs().format('YYYY')))
  const month = ref(Number.parseInt(dayjs().format('M')))
  const day = ref(Number.parseInt(dayjs().format('D')))

  const eventsMap = computed<Record<string, EventDay[]>>(() => {
    const events = data.value?.days
    if (!events)
      return {}
    const eventsMap: Record<string, EventDay[]> = {}
    events.forEach((event) => {
      const date = dayjs(event.date)
      const key = date.format('YYYY-M-D')
      if (!eventsMap[key])
        eventsMap[key] = []

      eventsMap[key].push(event)
    })
    return eventsMap
  })

  const days = computed<Day[]>(() => {
    const weekIdx = dayjs(`${year.value}-${month.value}-${1}`).day()
    const latestDay = dayjs(`${year.value}-${month.value}-${day.value}`).daysInMonth()

    const prevMonthDays = Array.from({ length: weekIdx - 1 }).map((_itm, idx) => {
      const pYear = month.value === 1 ? year.value - 1 : year.value
      const pMonth = month.value === 1 ? 12 : month.value - 1
      const weekDay = dayjs(`${pYear}-${pMonth}-${idx + 1}`).day()
      const daysInMonth = dayjs(`${pYear}-${pMonth}-${idx + 1}`).daysInMonth()
      return {
        day: daysInMonth - idx,
        date: `${pYear}-${pMonth}-${daysInMonth - idx}`,
        isPrevMonth: true,
        week: weekIdx - idx,
        weekDay,
        isToday: false,
        isWeekend: idx === 0 || idx === 6,
        events: eventsMap.value[`${pYear}-${pMonth}-${daysInMonth - idx}`],
      }
    }).reverse()

    const currentMonthDays = Array.from({ length: latestDay }, (_, i) => i + 1).map((itm, idx) => {
      const week = Math.floor(idx / 7)
      const weekDay = dayjs(`${year.value}-${month.value}-${itm}`).day()

      return {
        day: itm,
        week,
        weekDay,
        isToday: dayjs().format('YYYY-M-D') === `${year.value}-${month.value}-${itm}`,
        date: `${year.value}-${month.value}-${itm}`,
        isWeekend: weekDay === 0 || weekDay === 6,
        events: eventsMap.value[`${year.value}-${month.value}-${itm}`],
      }
    })

    const prevAndCurLength = prevMonthDays.length + currentMonthDays.length
    const nextMonthDays = Array.from({ length: (7 - prevAndCurLength % 7) === 7 ? 0 : (7 - prevAndCurLength % 7) }).map((_itm, idx) => {
      const nYear = month.value === 12 ? year.value + 1 : year.value
      const nMonth = month.value === 12 ? 1 : month.value + 1
      const week = Math.floor(prevAndCurLength / 7)
      const weekDay = dayjs(`${nYear}-${nMonth}-${idx + 1}`).day()

      return {
        day: idx + 1,
        week,
        weekDay,
        isToday: false,
        date: `${nYear}-${nMonth}-${idx + 1}`,
        isWeekend: weekDay === 0 || weekDay === 6,
        isNextMonth: true,
        events: eventsMap.value[`${nYear}-${nMonth}-${idx + 1}`],
      }
    })

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  })
  function addMonth() {
    if ((month.value + 1) > 12) {
      month.value = 1
      year.value += 1
    }
    else {
      month.value += 1
    }
  }

  function decreaseMonth() {
    if ((month.value - 1) < 1) {
      month.value = 12
      year.value -= 1
    }
    else {
      month.value -= 1
    }
  }

  return {
    year,
    month,
    day,
    addMonth,
    decreaseMonth,
    days,
    eventsMap,
  }
}
