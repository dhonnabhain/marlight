<template>
  <li
    v-if="internalComic"
    class="w-full shadow-sm border border-gray-200 rounded-md truncate hover:text-white hover:bg-red-500 transition duration-100"
  >
    <img :src="image" :alt="`${internalComic.title} cover`" class="w-32" />
  </li>
</template>

<script setup>
import { useComicsStore } from "@@/stores/comics";

const props = defineProps({
  comic: { type: Object, required: true },
});
const { comic } = toRefs(props);
const internalComic = ref(null);
const store = useComicsStore();

const id = computed(() => comic.value.resourceURI.split("/").at(-1));
const image = computed(() =>
  internalComic.value
    ? `${internalComic.value.images[0].path}.${internalComic.value.images[0].extension}`
    : null
);

async function loadDetail() {
  internalComic.value = await store.fetch({ id: id.value });
}

loadDetail();
</script>
