<template>
  <div class="mt-8">
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
      Comics <span class="font-bold text-red-500 pl-2">{{ count }}</span>
    </h2>

    <ul
      role="list"
      class="mt-3 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      <ComicsComic v-for="comic in comics" :comic="comic" />
    </ul>
  </div>
</template>

<script setup>
defineProps({
  comics: { type: Object, required: true },
  count: { type: Number, required: true },
});
</script>
