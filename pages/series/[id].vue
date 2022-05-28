<template>
  <main v-if="serie" class="sm:w-2/3 sm:mx-auto">
    <Back />

    <article class="p-8">
      <div class="sm:flex sm:gap-8">
        <img
          :src="thumbnail"
          :alt="`${serie.title} picture`"
          class="block object-cover rounded-lg sm:w-96 sm:self-start drop-shadow-xl"
        />

        <div class="flex flex-col mt-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ serie.title }}
          </h3>

          <p
            v-if="serie.description !== ''"
            class="prose prose-sm prose-slate dark:prose-invert mt-3 sm:mt-4"
          >
            {{ serie.description }}
          </p>

          <ExternalLink
            :url="urls.detail"
            label="Read more"
            icon="arrow-up-right-from-square"
            class="mt-4 w-full sm:w-auto sm:self-start"
          />
        </div>
      </div>

      <ComicsList :parent="serie" :count="serie.comics.available" entity="series" />
    </article>
  </main>
</template>

<script setup>
import { useSeriesStore } from "@@/stores/series";

definePageMeta({
  layout: "main",
});

const {
  params: { id },
} = useRoute();
const store = useSeriesStore();

let serie = ref(null);

const thumbnail = computed(() =>
  serie.value
    ? `${serie.value.thumbnail.path}.${serie.value.thumbnail.extension}`
    : null
);

const urls = computed(() => (serie.value ? useUrls(serie) : null));

async function load() {
  serie.value = await store.getSerie(id);
}

load();
</script>
