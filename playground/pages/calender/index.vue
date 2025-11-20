<script lang='ts' setup></script>

<template>
  <Calender :show-year="false">
    <template #day="{ day }">
      {{ day.isToday }}
    </template>
  </Calender>
</template>

<style scoped></style>
