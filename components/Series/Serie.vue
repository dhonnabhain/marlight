<template>
  <li class="w-full rounded-md truncate transition duration-100">
    <NuxtLink
      v-if="internalSerie"
      :to="link"
      class="flex items-center justify-between"
    >
      <img
        :src="thumbnail"
        :alt="`${internalSerie?.title} cover`"
        class="object-contains h-28"
      />
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

const id = computed(() => useResourceId(serie));
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
