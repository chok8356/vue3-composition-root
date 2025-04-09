<template>
  <div :class="$style.user">
    <div
      v-if="loading"
      data-test="loading-user-info">
      Loading info...
    </div>
    <template v-else>
      <div
        v-if="user"
        :class="$style.content">
        <!-- left -->
        <div :class="$style.contentPart">
          <!-- user -->
          <UserDetailInfo :user="user" />

          <!-- albums -->
          <UserDetailAlbums :albums="albums" />
        </div>

        <!-- right -->
        <div
          v-if="albumId && albums.length > 0"
          :class="$style.contentPart">
          <!-- photos -->
          <UserDetailAlbumPhotos
            :album-id="albumId"
            :available-album-ids="availableAlbumIds"
            :deps="deps.UserDetailAlbumPhotos"
            @close="onCloseAlbum" />
        </div>
      </div>
      <div
        v-else
        data-test="no-user-info">
        No info
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { UserDetailDeps } from '@/views/UserDetail/UserDetailDeps'

import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import type { IUserAlbum } from './types/IUserAlbum'
import type { IUserDetailInfo } from './types/IUserDetailInfo'

import UserDetailAlbumPhotos from './components/UserDetailAlbumPhotos/UserDetailAlbumPhotos.vue'
import UserDetailAlbums from './components/UserDetailAlbums/UserDetailAlbums.vue'
import UserDetailInfo from './components/UserDetailInfo/UserDetailInfo.vue'

const properties = defineProps<{
  albumId: number | undefined
  deps: UserDetailDeps
  userId: number | undefined
}>()

const router = useRouter()

const loading = ref(true)

// User

const user = ref<IUserDetailInfo>()

async function fetchUser() {
  if (properties.userId !== undefined) {
    await properties.deps.getUserDetailInfo(properties.userId).then((data) => {
      data.match({
        err: async () => {},
        ok: async (x) => {
          user.value = x
        },
      })
    })
  }
}

// Album
const albums = ref<IUserAlbum[]>([])

async function fetchAlbums() {
  if (properties.userId !== undefined) {
    await properties.deps.getUserAlbums(properties.userId).then((data) => {
      data.match({
        err: async () => {},
        ok: async (x) => {
          albums.value = x
        },
      })
    })
  }
}

const availableAlbumIds = computed<number[]>(() => {
  return albums.value.map(x => x.id)
})

// Fetch User and Album
async function fetchData() {
  if (properties.userId !== null) {
    loading.value = true
    await Promise.all([fetchUser(), fetchAlbums()])
    loading.value = false
  }
}

function onCloseAlbum() {
  router.push({ name: 'UserDetail', params: { userId: properties.userId } })
}

watch(
  () => properties.userId,
  () => fetchData(),
  { immediate: true },
)
</script>

<style module>
.user {
  display: flex;
  width: 100%;
}

.content {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 50%);
  width: 100%;
}

.contentPart {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}
</style>
