<template>
  <div :class="$style.users">
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
import type { IUserList } from '@/views/UsersList/types/IUserList'

import { useInjected } from '@/use/useInjected'
import { getUsersInjectionKey } from '@/views/UsersList/ports/GetUsersDelegate'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const users = ref<IUserList[]>([])

const getUsers = useInjected(getUsersInjectionKey)

onMounted(async () => {
  users.value = await getUsers()
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
