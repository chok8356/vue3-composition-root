<template>
  <div :class="$style.root">
    <h2>Albums</h2>
    <div
      v-if="albums.length > 0"
      :class="$style.albums">
      <RouterLink
        v-for="album in albums"
        :key="album.id"
        :class="$style.album"
        data-test="album"
        :to="{ name: 'UserDetailAlbum', params: { albumId: album.id } }">
        {{ album.title }}
      </RouterLink>
    </div>
    <div
      v-else
      data-test="no-albums">
      No albums
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'

import { RouterLink } from 'vue-router'

defineProps<{
  albums: IUserAlbum[]
}>()
</script>

<style module>
.root {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-end;
}

.albums {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.album {
  display: flex;
  width: 100%;
}
</style>
