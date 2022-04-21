<template>
  <form>
    <div>
      <label for="">Correo</label>
      <input type="email" class="p-1 border rounded-md">
    </div>
    <div>
      <label for="">Contraseña</label>
      <input type="password" class="p-1 border rounded-md">
    </div>
    <router-link to="/home">
      <button class="p-1 bg-green-500 text-white rounded-lg">
        Login
      </button>
    </router-link>
  </form>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
