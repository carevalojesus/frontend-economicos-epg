<script lang="ts" setup>
import { useUserStore } from './store/user'
const router = useRoute()
const userStore = useUserStore()

onMounted(() => {
  setTimeout(() => {
    const path = router.fullPath
    if (path === '/')
      localStorage.removeItem('userpgtoken')
  }, 500)

  const token = localStorage.getItem('userpgtoken') as string

  if (token)
    userStore.get_user_data_by_token()
})
</script>
<template>
  <router-view />
</template>
