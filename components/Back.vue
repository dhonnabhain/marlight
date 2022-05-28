<template>
  <button
    class="inline-flex items-center px-3 py-2 border border-transparent leading-4 font-medium rounded-md text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:red-indigo-500 hover:text-slate-900 transition ease-in-out duration-100 mt-3"
    @click="back"
  >
    <FontAwesomeIcon icon="chevron-left" />
    <span class="ml-4">Back</span>
  </button>
</template>

<script setup>
const router = useRouter();

function back() {
  router.back();
}
</script>
