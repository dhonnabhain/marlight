<template>
  <nav
    v-if="canPaginate"
    class="sticky z-50 py-4 px-8 bg-white w-screen left-0 right-0 bottom-0 border-t border-gray-200"
  >
    <div class="flex items-center justify-between sm:max-w-3xl sm:mx-auto">
      <div class="w-0 flex-1 flex">
        <button
          :class="{
            'text-gray-400 cursor-not-allowed ': previousDisabled,
            'text-gray-500 hover:text-red-700': !previousDisabled,
          }"
          :disabled="previousDisabled"
          class="pr-1 inline-flex items-center text-sm font-medium"
          @click="paginationHandler(true)"
        >
          <FontAwesomeIcon icon="arrow-left" />
          <span class="ml-3">Previous</span>
        </button>
      </div>
      <div v-if="!isCharacterDetail" class="hidden md:-mt-px md:flex">
        <span
          v-if="currentPage !== 0 && currentPage > 3"
          class="border-transparent text-gray-500 border-t-2 px-4 inline-flex items-center text-sm font-medium"
        >
          ...
        </span>

        <template v-for="page in pages">
          <button
            v-if="page >= currentPage - 3 && page <= currentPage + 3"
            :class="{
              'border-red-500 text-red-600': currentPage === page,
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
                currentPage !== page,
            }"
            class="border-t-2 px-4 inline-flex items-center text-sm font-medium"
            aria-current="page"
            @click="pageHandler(page)"
          >
            {{ page }}
          </button>
        </template>

        <span
          v-if="currentPage !== totalRecords && currentPage < totalRecords - 3"
          class="border-transparent text-gray-500 border-t-2 px-4 inline-flex items-center text-sm font-medium"
        >
          ...
        </span>
      </div>
      <div class="w-0 flex-1 flex justify-end">
        <button
          :class="{
            'text-gray-400 cursor-not-allowed ': nextDisabled,
            'text-gray-500 hover:text-red-700': !nextDisabled,
          }"
          :disabled="nextDisabled"
          class="pl-1 inline-flex items-center text-sm font-medium"
          @click="paginationHandler()"
        >
          <span class="mr-3">Next</span>
          <FontAwesomeIcon icon="arrow-right" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCharactersStore } from "@@/stores/characters";

const store = useCharactersStore();
const route = useRoute();
const router = useRouter();
const { currentOffset, currentCharacterIdx, totalRecords, currentCharacter } =
  storeToRefs(store);
const currentPage = ref(route.query.page ? parseInt(route.query.page) : 1);

const isCharacterDetail = computed(() => route.name === "characters-id");
const canPaginate = computed(
  () =>
    ["characters", "characters-id"].includes(route.name) &&
    ((isCharacterDetail.value && currentCharacterIdx.value !== null) ||
      !isCharacterDetail.value)
);
const pages = computed(() => Math.floor(totalRecords.value / 20) + 1);

const previousDisabled = computed(() => {
  if (isCharacterDetail.value) {
    return currentCharacterIdx.value === 0;
  }

  return currentOffset.value === 0;
});
const nextDisabled = computed(() => {
  if (isCharacterDetail.value) {
    return currentCharacterIdx.value === totalRecords.value;
  }

  currentOffset.value === totalRecords - 20;
});

async function paginationHandler(previous = false) {
  switch (route.name) {
    case "characters-id":
      paginateCharacter(previous);
      break;
    case "characters":
    default:
      paginateList(previous);
      break;
  }
}

function paginateList(previous) {
  store.$patch({
    currentOffset: previous
      ? currentOffset.value === 0
        ? 0
        : currentOffset.value - 20
      : currentOffset.value + 20,
  });
  currentPage.value = currentOffset.value / 20 + 1;
}

function paginateCharacter(previous) {
  store.setCurrentCharacter(previous);

  router.push(`/characters/${currentCharacter.value.id}`);
}

function pageHandler(page) {
  currentPage.value = page;

  store.$patch({
    currentOffset: (page - 1) * 20,
  });
}

if (currentPage.value !== 1) {
  pageHandler(currentPage.value);
}
</script>
