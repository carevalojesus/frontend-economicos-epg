<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import { CashIcon } from '@heroicons/vue/solid'
import { UsePagoStore } from '~/store/pago'

const pagoStore = UsePagoStore()
const buscar = ref('')

const estadoEstilo = (isConciliado: boolean) => {
  if (isConciliado)
    return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800'
  return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-yellow-100 text-yellow-800'
}

onMounted(() => {
  pagoStore.set_pagos_sin_conciliar(buscar.value)
})
// watch in buscar
watch(buscar, () => {
  pagoStore.set_pagos_sin_conciliar(buscar.value)
})

</script>
<template>
  <div class="bg-white shadow">
    <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div class="py-6 lg:border-t lg:border-gray-200">
        <div class="flex-1 min-w-0">
          <nav class="sm:hidden" aria-label="Back">
            <a href="#" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
              <ChevronLeftIcon class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              Back
            </a>
          </nav>
          <nav class="hidden sm:flex" aria-label="Breadcrumb">
            <ol role="list" class="flex items-center space-x-4">
              <li>
                <div class="flex">
                  <router-link to="home" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                    Home
                  </router-link>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <router-link to="conceptos" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Asignar pagos
                  </router-link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-primary-700 sm:text-3xl sm:truncate">
              Conciliar pagos
            </h2>
          </div>
          <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            <div>
              <label for="buscar" class="sr-only">Buscar</label>
              <input
                id="buscar" v-model="buscar" type="search"
                name="buscar"
                class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Buscar pago"
              >
            </div>
            <button
              type="button"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Nuevo pago
            </button>
          </div>
        </div>
      </div>
      <div class=" md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200" />
    </div>
  </div>
  <!-- contenido -->
  <section>
    <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
      Recent activity
    </h2>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
      <div class="sm:col-span-6">
        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div class="space-y-1 text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round"
                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
              />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer bg-white rounded-md font-medium text-info hover:text-cyan-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-info"
              >
                <span>Cargar un archivo</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only">
              </label>
              <p class="pl-1">
                o arrastrar y soltar
              </p>
            </div>
            <p class="text-xs text-gray-500">
              TXT, BATCH up to 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="hidden sm:block mt-5">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col mt-2">
        <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CONCEPTO
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PERSONA
                </th>
                <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IMPORTE
                </th>
                <th
                  class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                >
                  ESTADO
                </th>
                <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FECHA
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="concepto in pagoStore.pagos" :key="concepto.id" class="bg-white">
                <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex">
                    <a href="#" class="group inline-flex space-x-2 truncate text-sm">
                      <CashIcon
                        class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <p class="text-gray-500 truncate group-hover:text-gray-900">
                        {{ concepto.concepto_nombre }}
                      </p>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  {{ concepto.nombre_cliente }}
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  S/
                  <span class="text-gray-900 font-medium">{{ concepto.monto }} </span>
                </td>
                <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                  <span
                    :class="estadoEstilo(concepto.is_conciliado)"
                  >
                    {{ concepto.is_conciliado ? "Conciliado" : "No conciliado" }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  <time>{{ concepto.fecha_operacion }}</time>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
