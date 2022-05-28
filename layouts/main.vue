<template>
  <div class="flex flex-col">
    <header
      class="sticky w-full bg-black py-3 px-4 top-0 z-10 flex justify-center shadow-2xl"
    >
      <NuxtLink to="/characters">
        <img src="~/assets/marvel_logo.svg" class="w-24" />
      </NuxtLink>
    </header>

    <slot />

    <Paginate />
  </div>
</template>

<script setup>
useHead({
  titleTemplate: "My App - %s",
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    class: "bg-white antialiased font-sans scroll-smooth",
  },
});

definePageMeta({
  // layoutTransition: 'slide-fade'
});
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
