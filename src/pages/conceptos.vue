<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import { CashIcon } from '@heroicons/vue/solid'
import {
  Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions, Dialog,
  DialogOverlay, TransitionChild, TransitionRoot,
} from '@headlessui/vue'
const conceptos = [
  {
    id: 1,
    name: 'TRASLADO EXTERNO-POST GR 41',
    monto: '500',
    codigo: '531',
    estado: 'activo',
    moneda: 'S/',
  },
  {
    id: 2,
    name: 'TRASLADO EXTERNO-POST GR 41',
    monto: '500',
    codigo: '531',
    estado: 'activo',
    moneda: 'S/',
  },
  {
    id: 3,
    name: 'TRASLADO EXTERNO-POST GR 41',
    monto: '500',
    codigo: '531',
    estado: 'activo',
    moneda: 'S/',
  },
]
const estadoEstilo = {
  activo: 'bg-green-100 text-green-800',
  inactivo: 'bg-yellow-100 text-yellow-800',
  obsoleto: 'bg-gray-100 text-gray-800',
}
const open = true
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
                    Conceptos
                  </router-link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-primary-700 sm:text-3xl sm:truncate">
              Lista de conceptos
            </h2>
          </div>
          <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            <div>
              <label for="buscar" class="sr-only">Buscar</label>
              <input id="buscar" type="search" name="buscar" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Buscar concepto">
            </div>
            <button type="button" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Nuevo concepto
            </button>
          </div>
        </div>
      </div>
      <div class=" md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200" />
    </div>
  </div>
  <!-- contenido -->
  <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
    Recent activity
  </h2>

  <div class="hidden sm:block">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col mt-2">
        <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CONCEPTO
                </th>
                <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IMPORTE
                </th>
                <th class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                  ESTADO
                </th>
                <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CODIGO
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="concepto in conceptos" :key="concepto.id" class="bg-white">
                <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex">
                    <a href="#" class="group inline-flex space-x-2 truncate text-sm">
                      <CashIcon class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <p class="text-gray-500 truncate group-hover:text-gray-900">
                        {{ concepto.name }}
                      </p>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  {{ concepto.moneda }}
                  <span class="text-gray-900 font-medium">{{ concepto.monto }} </span>
                </td>
                <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                  <span :class="[estadoEstilo[concepto.estado], 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize']">
                    {{ concepto.estado }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  <time>{{ concepto.codigo }}</time>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                {{ ' ' }}
                <span class="font-medium">1</span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span class="font-medium">10</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span class="font-medium">20</span>
                {{ ' ' }}
                results
              </p>
            </div>
            <div class="flex-1 flex justify-between sm:justify-end">
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Anterior </a>
              <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Siguiente </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
