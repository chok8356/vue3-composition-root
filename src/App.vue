<template>
  <div :class="$style.app">
    <h1 :class="$style.title">{{ route.meta.title }}</h1>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()
</script>

<style module>
.app {
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 2rem;
}
</style>
