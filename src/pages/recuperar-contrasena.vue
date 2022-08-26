<template>
  <div class="min-h-screen flex">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-16 w-auto" src="/src/media/img/epg-2022.png" alt="Logo UNAP">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-700 uppercase">
            Sistema de Gestión Económica
          </h2>
          <p class="mt-2 text-blue-800">
            Oficina de Asuntos Económicos
          </p>
        </div>

        <div class="mt-8">
          <div>
            <div>
              <p class="text-sm font-medium text-gray-700">
                Restablecer la contraseña
              </p>

              <div class="mt-1 grid grid-cols-1 gap-3">
                <p class="text-gray-700 text-sm">
                  Introduzca su dirección de correo electrónico registrada abajo para recibir el enlace de restablecimiento de contraseña.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <form action="#" method="POST" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700"> Correo electrónico </label>
                <div class="mt-1">
                  <input id="email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <router-link to="/" class="font-medium text-blue-600 hover:text-blue-500">
                    Regresar para iniciar sesión
                  </router-link>
                </div>
              </div>

              <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="">
    </div>
  </div>
</template>
