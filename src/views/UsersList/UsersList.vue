<template>
  <div :class="$style.users">
    <div v-if="error">{{ error }}</div>
    <RouterLink
      v-for="user in users"
      :key="user.id"
      :class="$style.user"
      data-test="user"
      :to="{ name: 'UserDetail', params: { userId: user.id } }">
      {{ user.name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { UsersListDeps } from '@/views/UsersList/UsersListDeps'

import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import type { IUser } from './types/IUser'

const props = defineProps<{
  deps: UsersListDeps
}>()

const users = ref<IUser[]>([])

const error = ref('')

onMounted(async () => {
  await props.deps.getUsers().then((data) => {
    data.match({
      err: async (x) => {
        error.value = x
      },
      ok: async (x) => {
        users.value = x
      },
    })
  })
})
</script>

<style module>
.users {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.user {
  display: flex;
  width: 100%;
}
</style>
