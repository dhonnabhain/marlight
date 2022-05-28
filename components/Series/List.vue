<template>
  <div class="mt-8">
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
      Series
    </h2>

    <ul role="list" class="mt-3 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
      <SeriesSerie v-for="serie in series.items" :serie="serie" />
    </ul>
  </div>
</template>

<script setup>
defineProps({
  series: { type: Object, required: true },
});
</script>
