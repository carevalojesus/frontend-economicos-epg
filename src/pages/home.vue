<script setup lang="ts">
import {
  CalendarIcon,
  CashIcon,
  CheckCircleIcon,
  OfficeBuildingIcon,
  RefreshIcon,
  ScaleIcon,
} from '@heroicons/vue/outline'
import { UsePagoStore } from '~/store/pago'
const pagoStore = UsePagoStore()
const pagos_del_dia_list = ref<Pago[]>([])

const estadoEstilo = (isConciliado: boolean) => {
  if (isConciliado)
    return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800'
  return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-yellow-100 text-yellow-800'
}

const cards = ref([
  { name: 'Ingresos Anuales', href: 'ver-pagos', icon: ScaleIcon, amount: '0.00' },
  { name: 'Ingresos mensuales', href: 'ver-pagos', icon: CalendarIcon, amount: '0.00' },
  { name: 'Pendiente Conciliar', href: 'conciliar-pagos', icon: RefreshIcon, amount: '0.00' },
])

onMounted(async() => {
  const result = await pagoStore.get_dashboard()
  cards.value[0].amount = `S/ ${result.total_pagos_anio || 0}`
  cards.value[1].amount = `S/ ${result.total_pagos_mes || 0}`
  cards.value[2].amount = result.cantidad_pagos_por_conciliar || 0
  pagos_del_dia_list.value = result.pagos_del_dia_list
})

</script>
<template>
  <div class="bg-white shadow">
    <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
        <div class="flex-1 min-w-0">
          <!-- Profile -->
          <div class="flex items-center">
            <span class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-500 hidden lg:flex">
              <span class="text-lg font-medium leading-none text-white">HP</span>
            </span>
            <div>
              <div class="flex items-center">
                <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                  Buenos días, Hernán Pizarro
                </h1>
              </div>
              <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                <dt class="sr-only">
                  Company
                </dt>
                <dd class="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                  <OfficeBuildingIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Oficina de Asuntos Académicos
                </dd>
                <dt class="sr-only">
                  Account status
                </dt>
                <dd class="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                  <CheckCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                  Usuario
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <router-link to="ver-pagos">
              Ver pagos
            </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-lg leading-6 font-medium text-gray-900">
        Overview
      </h2>
      <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Card -->
        <div v-for="card in cards" :key="card.name" class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <component :is="card.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    {{ card.name }}
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ card.amount }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <a :href="card.href" class="font-medium text-cyan-700 hover:text-cyan-900"> Ver todos </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
    Top <b>{{ pagos_del_dia_list.length }}</b> pagos del día
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
            <tbody v-if="pagos_del_dia_list.length > 0" class="bg-white divide-y divide-gray-200">
              <tr v-for="pago in pagos_del_dia_list" :key="pago.id" class="bg-white">
                <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex">
                    <a class="group inline-flex space-x-2 truncate text-sm cursor-pointer">
                      <CashIcon
                        class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <p class="text-gray-500 truncate group-hover:text-gray-900">
                        {{ pago.concepto_nombre }}
                      </p>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  {{ pago.nombre_cliente }}
                </td>
                <td class="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                  S/
                  <span class="text-gray-900 font-medium">{{ pago.monto }} </span>
                </td>
                <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                  <span :class="estadoEstilo(pago.is_conciliado)">
                    {{ pago.is_conciliado ? 'Conciliado' : 'Ingresado' }}
                  </span>
                </td>
                <td class="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                  <time>{{ pago.fecha_operacion }}</time>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="bg-white divide-y divide-gray-200">
              <tr class="bg-white">
                <td class="max-w-0 w-full  whitespace-nowrap text-sm text-gray-900" colspan="5">
                  <div class="flex item-center text-center justify-center w-full px-6 py-4 text-gray-500">
                    No se encontraron registros
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
