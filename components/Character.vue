<template>
  <li
    class="relative col-span-1 flex flex-col text-center rounded-lg hover:shadow-lg hover:shadow-red-500 group transition-all ease-in-out duration-300 snap-center snap-always"
  >
    <NuxtLink
      :to="`/characters/${character.id}`"
      class="focus:outline-none h-full w-full"
    >
      <img
        :src="thumbnail"
        :alt="`${character.name} picture`"
        class="block object-cover h-48 w-full rounded-lg"
      />

      <div
        class="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-white to-transparent h-full flex flex-col justify-end content-end pb-6 group-hover:from-red-500 transition-all ease-in-out duration-500"
      >
        <h3
          class="font-app text-xl mt-6 text-slate-900 font-bolder group-hover:text-white transition-all ease-in-out duration-300"
        >
          {{ character.name }}
        </h3>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup>
const props = defineProps({
  character: { type: Object, required: true },
});

const { character } = toRefs(props);

const thumbnail = computed(
  () =>
    `${character.value.thumbnail.path}.${character.value.thumbnail.extension}`
);
</script>

<style>
@font-face {
  font-family: OpenSans;
  src: local("OpenSans"), url(~/assets/OpenSans_Condensed-Bold.ttf);
  font-weight: bold;
}

@font-face {
  font-family: OpenSans;
  src: local("OpenSans"), url(~/assets/OpenSans_Condensed-ExtraBold.ttf);
  font-weight: bolder;
}
</style>
