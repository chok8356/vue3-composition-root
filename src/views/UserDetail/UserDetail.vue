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
import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'
import type { IUserDetailInfo } from '@/views/UserDetail/types/IUserDetailInfo'

import { useInjected } from '@/use/useInjected'
import UserDetailAlbumPhotos from '@/views/UserDetail/components/UserDetailAlbumPhotos/UserDetailAlbumPhotos.vue'
import UserDetailAlbums from '@/views/UserDetail/components/UserDetailAlbums/UserDetailAlbums.vue'
import UserDetailInfo from '@/views/UserDetail/components/UserDetailInfo/UserDetailInfo.vue'
import { getUserAlbumsInjectionKey } from '@/views/UserDetail/ports/GetUserAlbumsDelegate'
import { getUserInjectionKey } from '@/views/UserDetail/ports/GetUserDelegate'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = withDefaults(
  defineProps<{
    albumId: null | number
    userId: null | number
  }>(),
  {
    albumId: null,
    userId: null,
  },
)

const loading = ref(true)

// User
const getUser = useInjected(getUserInjectionKey)

const user = ref<IUserDetailInfo | null>(null)

const fetchUser = async () => {
  if (props.userId !== null) {
    user.value = await getUser(props.userId)
  }
}

// Album
const getUserAlbums = useInjected(getUserAlbumsInjectionKey)

const albums = ref<IUserAlbum[]>([])

const fetchAlbums = async () => {
  if (props.userId !== null) {
    albums.value = await getUserAlbums(props.userId)
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
