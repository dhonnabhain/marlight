<template>
  <li
    class="w-full shadow-sm border border-gray-200 rounded-md truncate hover:text-white hover:bg-red-500 transition duration-100"
  >
    <NuxtLink v-if="internalSerie" :to="link" class="flex items-center justify-between">
      <!-- <div class="flex-1 flex justify-between items-center px-4 py-2 text-sm">
        <p class="truncate">{{ serie.name }}</p>
        <FontAwesomeIcon icon="chevron-right" />
      </div> -->
      <img :src="thumbnail" :alt="`${internalSerie?.title} cover`" class="object-fill h-full" />
    </NuxtLink>
  </li>
</template>

<script setup>
import { useSeriesStore } from "@@/stores/series";

const props = defineProps({
  serie: { type: Object, required: true },
});
const { serie } = toRefs(props);
const store = useSeriesStore();
const internalSerie = ref(null);

const id = computed(() => serie.value.resourceURI.split("/").at(-1));
const link = computed(() => `/series/${id.value}`);

const thumbnail = computed(() =>
  internalSerie.value
    ? `${internalSerie.value.thumbnail.path}.${internalSerie.value.thumbnail.extension}`
    : null
);

async function loadDetail() {
  await store.fetch({ id: id.value });
  internalSerie.value = await store.getSerie(id.value);
}

loadDetail();
</script>
