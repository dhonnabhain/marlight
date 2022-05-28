<template>
  <main class="sm:w-2/3 sm:mx-auto md:w-4/5">
    <Back />

    <article v-if="currentCharacter" class="p-8">
      <div class="sm:flex sm:gap-8">
        <img
          :src="thumbnail"
          :alt="`${currentCharacter.name} picture`"
          class="block object-cover rounded-lg sm:w-96 sm:self-start drop-shadow-xl"
        />

        <div class="flex flex-col">
          <h2
            class="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate mt-8"
          >
            {{ currentCharacter?.name }}
          </h2>

          <p
            :class="{ italic: !hasDescription }"
            class="prose prose-sm prose-slate dark:prose-invert mt-4"
          >
            {{
              hasDescription ? currentCharacter.description : missingDescription
            }}
          </p>

          <ExternalLink
            :url="urls.wiki"
            label="Read more"
            icon="arrow-up-right-from-square"
            class="mt-4 w-full sm:w-auto sm:self-start"
          />
        </div>
      </div>

      <SeriesList :series="currentCharacter.series" />

      <ComicsList
        :parent="currentCharacter"
        :count="currentCharacter.comics.available"
        entity="characters"
      />
    </article>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCharactersStore } from "@@/stores/characters";
import sample from "lodash.sample";

definePageMeta({
  layout: "main",
});

const route = useRoute();
const store = useCharactersStore();

store.fetchCharacter(route.params.id);

const { currentCharacter } = storeToRefs(store);

const urls = computed(() => {
  let urls = {};

  currentCharacter.value.urls.forEach((url) => (urls[url.type] = url.url));

  return urls;
});

const thumbnail = computed(() =>
  currentCharacter
    ? `${currentCharacter.value.thumbnail.path}.${currentCharacter.value.thumbnail.extension}`
    : null
);

const hasDescription = computed(
  () => currentCharacter.value.description !== ""
);

const missingDescription = computed(() => {
  const texts = [
    "The :name's description is going to an epic battle!",
    "The :name's description is busy learning to count more than three times a thousand",
    "The :name's description is moving Black Widow",
    "The :name's description is eating a chawarma",
    "The :name's description is searching why is Gamorra",
    "The :name's description is listening to its little antenna",
  ];

  return sample(texts).replace(":name", currentCharacter.value.name);
});
</script>
