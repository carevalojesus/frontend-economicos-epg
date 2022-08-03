<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import {
  Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions,
} from '@headlessui/vue'
import {
  CheckIcon,
} from '@heroicons/vue/solid'
import type { ProgramaModel } from '~/interfaces/models'
import { useReporteStore } from '~/store/reporte'
import { UseProgramaStore } from '~/store/programa'

const fecha = ref('2022/07/07')
const query = ref('')
// #const programa_id = ref('7')
const reportStore = useReporteStore()
const programaStore = UseProgramaStore()
const programaSelected = ref({} as ProgramaModel)
const report_obj = ref(null)

onMounted(() => {
  programaStore.set_programas()
})

const get_reporte_economico_alumno = async(programa_id: any) => {
  if (fecha.value.length <= 0)
    return

  const { status, data } = await reportStore.get_reporte_programas_excel(programa_id, fecha.value) || {}
  if (status !== 200) {
    createToast('Error al exportar excel', {
      type: 'danger',
      hideProgressBar: true,
    })
    return
  }
  report_obj.value = data
  const a = document.createElement('a')
  a.target = '_blank'
  a.href = reportStore.get_media_url(data.path)
  a.click()
}
</script>

<template>
  <div class="bg-white shadow">
    <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div class="py-6 lg:border-t lg:border-gray-200">
        <div class="mt-2 md:flex-5 md:items-center md:justify-between">
          <div class="flex-2 min-w-0 mb-5">
            <h2 class="text-2xl font-bold leading-7 text-primary-700 sm:text-3xl sm:truncate pr-5">
              Reporte de Programas
            </h2>
          </div>
          <div class="mt-4 flex-shrink-0 flex md:mt-0 md:justify-between">
            <div class="pr-12 w-full">
              <Combobox v-model="programaSelected" as="div" class="col-span-12">
                <ComboboxLabel class="block text-sm font-medium text-gray-700">
                  Seleccione el programa
                </ComboboxLabel>
                <div class="relative mt-1">
                  <ComboboxInput
                    class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-info focus:outline-none focus:ring-1 focus:ring-info sm:text-sm"
                    autocomplete="off" :display-value="(programa: any) => programa.nombre || ''"
                    @change="query = $event.target.value"
                  />
                  <ComboboxButton
                    class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                  >
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </ComboboxButton>

                  <ComboboxOptions
                    v-if="programaStore.filter_programas_by_nombre(query).length > 0"
                    class="absolute z-10 mt-1 max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ComboboxOption
                      v-for="programa in programaStore.filter_programas_by_nombre(query)"
                      :key="programa.id" v-slot="{ active, selected }" :value="programa" as="template"
                    >
                      <li
                        :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-info text-white' : 'text-gray-900']"
                      >
                        <div class="flex">
                          <span :class="['truncate', selected && 'font-semibold']">{{ programa.nombre }}</span>
                          <span
                            :class="['ml-2 truncate text-gray-500', active ? 'text-indigo-200' : 'text-gray-500']"
                          >{{
                            programa.codigo
                          }}</span>
                        </div>

                        <span
                          v-if="selected"
                          :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-info']"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>
            <div class="pr-12">
              <label for="fecha">Fecha:</label>
              <input
                id="fecha" v-model="fecha" type="date" name="fecha"
                class="mt-0 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
            </div>
            <div class="md:items-center">
              <button
                type="button"
                class="ml-0 w-full items-center px-4 border border-transparent mt-9 rounded-md shadow-sm font-medium text-white bg-primary-500 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="get_reporte_economico_alumno(programaSelected.id)"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class=" md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200" />
    </div>
  </div>

  <div v-if="report_obj">
    <!--- Tabla Historial-->
    <div class="px-4 sm:px-6 lg:px-8">
      <!-- <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto mt-10">
          <br>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Exportar a Excel
          </button>
        </div>
      </div> -->
      <!-- <div class="max-w-5xl pt-10 px-4 sm:px-6 lg:px-8">
        <p class="text-black text-left font-bold">
          Lista de Pagos
        </p>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      NOMBRE COMPLETO
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      DNI
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      FECHA
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      MONTO
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      CONCEPTO
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      N° CONCILIACION
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      PROGRAMA
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(pago, index) in report_obj.pagos_programa" :key="index">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      {{ pago.anio_operacion }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.fecha_operacion }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.numero_conciliacion || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.numero_operacion }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.nro_cuota }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.concepto }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.monto_cuota }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.monto_pagado }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.saldo }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
