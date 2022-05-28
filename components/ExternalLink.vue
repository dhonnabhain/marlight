<template>
  <a
    :href="url"
    :class="{
      'text-red-700 hover:bg-red-200': ghost,
      'text-white bg-red-600 hover:bg-red-700': !ghost,
    }"
    target="_blank"
    class="block text-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-75 ease-in-out"
  >
    <span class="mr-3">{{ label }}</span>
    <FontAwesomeIcon :icon="icon" />
  </a>
</template>

<script setup>
defineProps({
  url: { type: String, required: true },
  icon: { type: [Array, String], default: "" },
  label: { type: String, default: "" },
  ghost: { type: Boolean, default: false },
});
</script>
