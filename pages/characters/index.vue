<template>
  <main class="pb-16 sm:w-2/3 sm:mx-auto">
    <ul
      role="list"
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 auto-cols-min"
    >
      <Placeholder v-if="loading" v-for="idx in 20" />

      <Character
        v-else
        v-for="character in charactersToShow"
        :character="character"
      />
    </ul>

    <p class="text-center text-xs">{{ attribution }}</p>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCharactersStore } from "@@/stores/characters";
import useCharacters from "~~/composables/useCharacters";

definePageMeta({
  layout: "main",
});

const store = useCharactersStore();
const { characters, currentOffset, attribution } = storeToRefs(store);
let loading = ref(false);

load();

const charactersToShow = computed(() => characters.value[currentOffset.value]);

async function load() {
  loading.value = true;
  await useCharacters();
  loading.value = false;
}

watch(currentOffset, load);
</script>
