<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'

import {
  CheckIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/vue/solid'

import { useReporteStore } from '~/store/reporte'
// const exist_result = ref(false)
const dni = ref('')
const reportStore = useReporteStore()
const report_obj = ref(null)
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = ref(
  [
    {
      id: 1,
      type: eventTypes.applied,
      content: 'Alumno',
      target: '',
    },
    {
      id: 2,
      type: eventTypes.advanced,
      content: 'Programa',
      target: '',
    },
    {
      id: 3,
      type: eventTypes.completed,
      content: 'Promoción',
      target: '',
    },
  ],
)

const get_reporte_economico_alumno = async() => {
  if (dni.value.length <= 0)
    return

  const result = await reportStore.get_reporte_economico_alumno_api(dni.value) || {}

  if (Object.entries(result).length <= 1) {
    createToast('No se encontró el expediente', {
      type: 'danger',
      hideProgressBar: true,
      timeout: 1000,
    })
    return
  }
  timeline.value[0].target = result.expediente.nombres_apellidos
  timeline.value[1].target = result.expediente.programa_nombre
  timeline.value[2].target = result.expediente.promocion || '-'
  report_obj.value = result
}

const reporte_economico_pdf = async(numero_documento: string) => {
  const { status, data } = await reportStore.get_reporte_economico_alumno_pdf(numero_documento)
  if (status !== 200) {
    createToast('Error al obtener el reporte', {
      type: 'danger',
      hideProgressBar: true,
    })
    return
  }

  const a = document.createElement('a')
  a.target = '_blank'
  a.href = data.path
  a.click()
}
</script>

<template>
  <div class="bg-white shadow">
    <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div class="py-6 lg:border-t lg:border-gray-200">
        <div class="mt-2 md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-primary-700 sm:text-3xl sm:truncate">
              Reporte Económico de Alumno
            </h2>
          </div>
          <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            <div>
              <label for="buscar" class="sr-only">Buscar</label>
              <input
                id="buscar" v-model="dni" type="search" name="buscar"
                class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Ingrese dni..."
              >
            </div>
            <button
              type="button"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="get_reporte_economico_alumno()"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div class=" md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200" />
    </div>
  </div>

  <div v-if="report_obj">
    <div
      class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"
    >
      <div class="space-y-6 lg:col-start-1 lg:col-span-2">
        <!-- Description list-->
        <section aria-labelledby="applicant-information-title">
          <div class="bg-white shadow border-2 sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                Informe Económico
              </h2>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Información personal del
                estudiante.
              </p>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Costo Pensión
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    S/ {{ report_obj.costo_total_pension }}
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ report_obj.cuotas }} Cuotas X S/ {{ report_obj.pension }}
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900">
                    Pago de {{ (report_obj.cuotas/report_obj.cantidad_matriculas).toFixed(0) }} Cuotas x Ciclo
                  </dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Pensión a la fecha
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    S/ {{ report_obj.suma_pagos_programa }}
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ (report_obj.suma_pagos_programa/(report_obj.pension-1)).toFixed(0) }} Cuotas
                  </dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Matricula Total
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    S/ {{ report_obj.costo_total_matricula }}
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ report_obj.cantidad_matriculas }} Matriculas X S/ {{ report_obj.precio_matricula }}
                  </dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Matricula a la Fecha
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    S/ {{ report_obj.suma_pagos_matricula }}
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ report_obj.cantidad_pagos_matricula }} MAT
                  </dd>
                </div>

                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Costo Total Maestria
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    S/ {{ report_obj.costo_total_total }}
                  </dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Pago Total a la Fecha
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    S/ {{ report_obj.pagos_totales }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="timeline-title" class="lg:col-start-3 lg:col-span-1">
        <div class="bg-white px-4 py-5 shadow border-2 sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" class="text-lg font-medium text-gray-900">
            ESTUDIANTE
          </h2>

          <!-- Activity Feed -->
          <div class="mt-6 flow-root">
            <ul role="list" class="-mb-8">
              <li v-for="(item, itemIdx) in timeline" :key="item.id">
                <div class="relative pb-8">
                  <span
                    v-if="itemIdx !== timeline.length - 1"
                    class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                  <div class="relative flex space-x-3">
                    <div>
                      <span
                        :class="[item.type.bgColorClass, 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']"
                      >
                        <component
                          :is="item.type.icon" class="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p class="text-sm text-gray-500">
                          {{ item.content }} <a href="#" class="font-medium text-gray-900">{{
                            item.target
                          }}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!--- Tabla Historial-->
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <br>
          <p class="mt-2 text-2xl text-gray-700 text-center font-bold">
            Historial de pago.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            @click="reporte_economico_pdf(dni)"
          >
            IMPRIMIR
          </button>
        </div>
      </div>

      <div class="mt-6 max-w-5xl pt-10 px-4 sm:px-6 lg:px-8">
        <p class="text-black text-left font-bold">
          Deuda Pensión
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
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      N°
                    </th><th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      AÑO
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
                      N° DOC/OGA
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      BCO. DE LA NACION
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      CUOTAS
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
                      MONTO
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      PAGO
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      DEUDA
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(pago, index) in report_obj.pagos_programa" :key="index">
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ pago.nro_cuota }}
                    </td>
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
                      {{ (pago.monto_cuota/(report_obj.pension-1)).toFixed(0) }}
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

                <tfoot>
                  <tr>
                    <th
                      scope="row" colspan="7"
                      class="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                    >
                      COSTO PENSIÓN
                    </th>
                    <th
                      scope="row"
                      class="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                    >
                      COSTO PENSIÓN
                    </th>
                    <td class="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                      {{ report_obj.costo_total_pension }}
                    </td>
                  </tr>

                  <tr>
                    <th
                      scope="row" colspan="7"
                      class="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                    >
                      DEBE
                    </th>
                    <th
                      scope="row"
                      class="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                    >
                      DEBE
                    </th>
                    <td
                      class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                    >
                      {{ report_obj.total_debe_pension }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 max-w-5xl pt-10 px-4 sm:px-6 lg:px-8">
        <p class="text-black text-left font-bold">
          Deuda Matricula
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
                      AÑO
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
                      N° DOC/OGA
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      BCO. DE LA NACION
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      N° CUOTA
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
                      MONTO
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      PAGO
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      DEUDA
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(pago, index) in report_obj.pagos_matricula" :key="index">
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

                <tfoot>
                  <tr>
                    <th
                      scope="row" colspan="7"
                      class="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                    >
                      COSTO MATRICULA
                    </th>
                    <th
                      scope="row"
                      class="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                    >
                      COSTO MATRICULA
                    </th>
                    <td class="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                      {{ report_obj.costo_total_matricula }}
                    </td>
                  </tr>

                  <tr>
                    <th
                      scope="row" colspan="7"
                      class="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                    >
                      DEBE
                    </th>
                    <th
                      scope="row"
                      class="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                    >
                      DEBE
                    </th>
                    <td
                      class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                    >
                      {{ report_obj.total_debe_matricula }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 max-w-5xl pt-10 px-4 sm:px-6 lg:px-8">
        <p class="text-black text-left font-bold">
          Otros Conceptos
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
                      AÑO
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
                      N° DOC/OGA
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      BCO. DE LA NACION
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
                      MONTO
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(pago, index) in report_obj.pagos_otros" :key="index">
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
                      {{ pago.concepto }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                      {{ pago.monto_cuota }}
                    </td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <th
                      scope="row" colspan="5"
                      class="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                    >
                      TOTAL
                    </th>
                    <td
                      class="pl-3 pr-4 pt-4 text-center text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                    >
                      {{ report_obj.total_otros }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
