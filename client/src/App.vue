<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full h-full">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<style scoped>
@import 'assets/reset.css';
</style>
