<template>
  <li
    v-if="internalComic"
    class="w-32 rounded-md truncate hover:text-white flex justify-center xl:w-48"
  >
    <img v-if="image" :src="image" :alt="`${internalComic.title} cover`" class="w-full" />

    <p
      v-else
      class="w-32 h-48 bg-slate-50 flex justify-center items-center prose break-all flex-wrap xl:w-48 xl:h-72"
    >
      <div class="whitespace-normal break-words text-center p-2">
        <p>No cover for</p>
        <p>{{ internalComic.title }}</p>
      </div>
    </p>
  </li>
</template>

<script setup>
import { useComicsStore } from "@@/stores/comics";

const props = defineProps({
  comic: { type: Object, default: {} },
});

const { comic } = toRefs(props);
const internalComic = ref(null);
const store = useComicsStore();
const id = computed(() => useResourceId(comic));
const link = computed(() => `/comics/${id.value}`);

const image = computed(() =>
  internalComic.value && internalComic.value.images.length > 0
    ? `${internalComic.value.images[0].path}.${internalComic.value.images[0].extension}`
    : null
);

async function loadDetail() {
  internalComic.value = await store.fetch({ id: id.value });
}

loadDetail();
</script>
