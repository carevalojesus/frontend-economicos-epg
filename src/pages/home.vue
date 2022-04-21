<template>
  <div class="rounded-md flex gap-2">
    <router-link to="ruta1">
      <button class="bg-green-300 p-2 rounded-lg font-bold">
        Ir a ruta 1
      </button>
    </router-link>

    <router-link to="ruta2">
      <button class="bg-green-300 p-2 rounded-lg font-bold">
        Ir a ruta 2
      </button>
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
