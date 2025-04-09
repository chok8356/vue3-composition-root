<template>
  <div :class="$style.root">
    <h2>Photos</h2>
    <div
      v-if="loadingPhotos"
      data-test="loading-photos">
      Loading photos...
    </div>
    <template v-else>
      <div
        v-if="photos.length > 0"
        :class="$style.photosWrapper">
        <div
          class="scrollbar"
          :class="$style.photos">
          <div
            v-for="photo in photos"
            :key="photo.id"
            :class="$style.photo"
            data-test="photo">
            {{ photo.id }}
          </div>
        </div>
        <div :class="$style.buttons">
          <Button
            data-test="load-more"
            :disabled="loadingPhotosMore"
            text="Load more"
            @click="fetchAlbumDataMore" />
          <Button
            data-test="close"
            text="Close"
            type="secondary"
            @click="emit('close')" />
        </div>
      </div>
      <div
        v-else
        data-test="no-photos">
        No photos
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { UserDetailAlbumPhotosDeps } from '@/views/UserDetail/components/UserDetailAlbumPhotos/UserDetailAlbumPhotosDeps'
import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'

import Button from '@/components/core/Button.vue'
import { ref, watch } from 'vue'

import type { IAlbumPhoto } from './types/IAlbumPhoto'

const properties = defineProps<{
  albumId: null | number
  availableAlbumIds: IUserAlbum['id'][]
  deps: UserDetailAlbumPhotosDeps
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const loadingPhotos = ref(true)
const photos = ref<IAlbumPhoto[]>([])
const page = ref(1)

const fetchAlbumData = async () => {
  if (properties.albumId !== null && properties.availableAlbumIds.includes(properties.albumId)) {
    loadingPhotos.value = true
    await properties.deps.getAlbumPhotos(properties.albumId, page.value).then((data) => {
      data.match({
        err: async () => {},
        ok: async (x) => {
          photos.value = x
        },
      })
    })
    loadingPhotos.value = false
  }
}

// Loading more
const loadingPhotosMore = ref(false)
const fetchAlbumDataMore = async () => {
  if (properties.albumId !== null && !loadingPhotosMore.value) {
    loadingPhotosMore.value = true
    page.value += 1
    await properties.deps.getAlbumPhotos(properties.albumId, page.value).then((data) => {
      data.match({
        err: async () => {},
        ok: async (x) => {
          photos.value = [...photos.value, ...x]
        },
      })
    })
    loadingPhotosMore.value = false
  }
}

watch(
  () => properties.albumId,
  () => fetchAlbumData(),
  { immediate: true },
)
</script>

<style module>
.root {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-end;
}

.photosWrapper {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
}

.photos {
  display: inline-grid;
  gap: 8px;
  grid-auto-rows: 150px;
  grid-template-columns: repeat(3, 150px);
  max-height: calc(150px * 4 + 8px * 3);
  overflow: hidden scroll;
  width: auto;
}

.photo {
  align-items: center;
  border: 1px solid grey;
  border-radius: 1rem;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.buttons {
  align-items: center;
  display: flex;
  gap: 1rem;
}
</style>
