<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center bg-black"
  >
    <img
      src="~/assets/marvel_logo.svg"
      :class="{ 'w-32 -translate-y-10': showLoader, 'w-40': !showLoader }"
      class="transition duration-300"
    />

    <Loader v-show="showLoader" class="transition duration-75" />
  </div>
</template>

<script setup>
import useCharacters from "~~/composables/useCharacters";

const showLoader = ref(false);

useRouter();
load();

setTimeout(() => (showLoader.value = true), 300);

async function load() {
  await useCharacters();

  navigateTo({ path: "/characters" });
}
</script>
