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
