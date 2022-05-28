<template>
  <div class="mt-8">
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
      Comics <span class="font-bold text-red-500 pl-2">{{ count }}</span>
    </h2>

    <ul
      role="list"
      class="mt-3 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8"
    >
      <ComicsComic
        v-if="comics.length > 0"
        v-for="comic in comics"
        :comic="comic"
      />

      <Placeholder v-else v-for="idx in count" comic />
    </ul>
  </div>
</template>

<script setup>
import { useComicsStore } from "@@/stores/comics";

const props = defineProps({
  parent: { type: Object, required: true },
  count: { type: Number, required: true },
  entity: { type: String, required: true },
});

const comics = ref([]);
const store = useComicsStore();
const { parent, count, entity } = toRefs(props);

async function loadComics() {
  comics.value = await store.loadFromEntity({
    id: parent.value.id,
    entity: entity.value,
    limit: count.value,
  });
}

loadComics();
</script>
