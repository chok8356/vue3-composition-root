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
        <!--left-->
        <div :class="$style.contentPart">
          <!--user-->
          <UserDetailInfo :user="user" />

          <!--albums-->
          <UserDetailAlbums :albums="albums" />
        </div>

        <!--right-->
        <div
          v-if="albumId && albums.length"
          :class="$style.contentPart">
          <!--photos-->
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

const router = useRouter()

const props = withDefaults(
  defineProps<{
    albumId: null | number
    deps: UserDetailDeps
    userId: null | number
  }>(),
  {
    albumId: null,
    userId: null,
  },
)

const loading = ref(true)

// User

const user = ref<IUserDetailInfo | null>(null)

const fetchUser = async () => {
  if (props.userId !== null) {
    await props.deps.getUserDetailInfo(props.userId).then((data) => {
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

const fetchAlbums = async () => {
  if (props.userId !== null) {
    await props.deps.getUserAlbums(props.userId).then((data) => {
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
  return albums.value.map((x) => x.id)
})

const onCloseAlbum = () => {
  router.push({ name: 'UserDetail', params: { userId: props.userId } })
}

// Fetch User and Album
const fetchData = async () => {
  if (props.userId !== null) {
    loading.value = true
    await Promise.all([fetchUser(), fetchAlbums()])
    loading.value = false
  }
}

watch(
  () => props.userId,
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
