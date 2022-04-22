<script setup lang="ts">
import { useUserStore } from '~/store/user'
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  if (!localStorage.getItem('userpgtoken'))
    router.push('/')

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
  <div class="min-h-screen">
    <sidebar />
    <div class="lg:pl-64 flex flex-col flex-1">
      <navbar />
      <main class="flex-1 pb-8">
        <router-view />
      </main>
    </div>
  </div>
</template>
