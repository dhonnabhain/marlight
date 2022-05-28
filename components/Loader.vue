<template>
  <div class="loader"></div>
</template>

<style>
div.loader {
  position: relative;
  width: 2em;
  height: 2em;
  border: 3px solid #ef4444;
  overflow: hidden;
  animation: spin 3s ease infinite;
}

div.loader::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 2em;
  height: 2em;
  background-color: hsla(0, 84%, 60%, 0.75);
  transform-origin: center bottom;
  transform: scaleY(1);
  animation: fill 3s linear infinite;
}

@keyframes spin {
  50%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fill {
  25%,
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
