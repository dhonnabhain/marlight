<template>
  <li
    v-if="comic"
    class="w-full rounded-md truncate hover:text-white flex justify-center animate-pulse"
  >
    <div class="w-32 h-48 bg-slate-400 rounded" />
  </li>

  <li
    v-else
    class="relative col-span-1 flex flex-col justify-end items-center p-2 pb-6 animate-pulse bg-slate-300 h-48 w-full rounded-lg"
  >
    <div class="bg-slate-400 w-2/3 h-3 rounded"></div>
  </li>
</template>

<script setup>
defineProps({
  comic: { type: Boolean, default: false },
});
</script>
