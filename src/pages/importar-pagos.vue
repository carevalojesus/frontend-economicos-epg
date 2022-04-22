<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import { createToast } from 'mosha-vue-toastify'
import type { PagoModel } from '~/interfaces/models'
import { UseConceptoStore } from '~/store/concepto'
import { UsePagoStore } from '~/store/pago'
const conceptoStore = UseConceptoStore()
const pagoStore = UsePagoStore()
const pagosData = ref<PagoModel[]>([])

const Readtxt = async(e: Event) => {
  try {
    const fun = () => {
      return new Promise((resolve) => {
        const input = e.target as HTMLInputElement
        const reader = new FileReader()
        reader.onload = function() {
          const text = reader.result
          resolve(text)
        }
        if (input.files)
          reader.readAsText(input.files[0])
      })
    }

    await fun().then((res) => {
      const pagos = (res as string).split('\n')
      pagos.forEach((pago: string) => {
        const codigo_concepto = pago.slice(35, 43)
        const condicion = pago.slice(112, 113)
        const concepto = conceptoStore.get_concepto_by_codigo(codigo_concepto)
        if (concepto && Number(condicion) === 2) {
          const pagoModel = {} as PagoModel
          let numero_documeno = pago.slice(47, 62)
          numero_documeno = numero_documeno.trim()
          numero_documeno = numero_documeno.slice(7, 15)
          let nombre_cliente = pago.slice(121, 156)
          nombre_cliente = nombre_cliente.trim()
          let fecha_operacion = pago.slice(79, 87)
          const anio = fecha_operacion.slice(0, 4)
          const mes = fecha_operacion.slice(4, 6)
          const dia = fecha_operacion.slice(6, 8)
          fecha_operacion = `${anio}-${mes}-${dia}`
          const numero_operacion = pago.slice(18, 25)
          let monto_str = pago.slice(62, 77)
          let decimales = ''
          decimales = monto_str.slice(13, 15)[0]
          monto_str = monto_str.slice(1, 13)
          monto_str = `${monto_str}.${decimales}`
          const monto = parseFloat(monto_str)
          //
          pagoModel.nombre_cliente = nombre_cliente
          pagoModel.numero_documento = numero_documeno
          pagoModel.numero_operacion = numero_operacion
          pagoModel.fecha_operacion = fecha_operacion
          pagoModel.monto = monto
          pagoModel.concepto = concepto.id
          pagoModel.is_active = true
          pagosData.value.push(pagoModel)
        }
      })
    })
  }
  catch (error) {
    // eslint-disable-next-line no-alert
    alert(error)
  }
}

const SubirPagos = async() => {
  const response = await pagoStore.save_pagos(pagosData.value)
  if (!response) {
    createToast('Error al subir pagos', {
      type: 'danger',
      timeout: 5000,
      hideProgressBar: true,
    })
    return
  }
  createToast(`Se Procesaron : ${pagosData.value.length} Nuevos pagos`, {
    type: 'success',
    timeout: 3000,
    hideProgressBar: true,
  })
  pagosData.value = []
  // file-upload
  document.getElementById('file-upload').value = ''
}

onMounted(() => {
  conceptoStore.set_conceptos('')
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
                    Importar pagos
                  </router-link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-primary-700 sm:text-3xl sm:truncate">
              Importar pagos
            </h2>
          </div>
          <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            <button type="button" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="SubirPagos()">
              Procesar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- contenido -->
  <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
    Subir archivo
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
              <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="Readtxt">
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

  <div class="hidden sm:block">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col mt-2">
        <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PERSONA
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DOCUMENTO
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OPERACIÓN
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IMPORTE
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FECHA
                </th>
              </tr>
            </thead>
            <tbody v-if="pagosData.length > 0" class="bg-white divide-y divide-gray-200">
              <tr v-for="(pago, i) in pagosData" :key="i" class="bg-white">
                <td class="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                  {{ pago.nombre_cliente }}
                </td>
                <td class="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                  {{ pago.numero_documento }}
                </td>
                <td class="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                  {{ pago.numero_operacion }}
                </td>
                <td class="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                  S/
                  <span class="text-gray-900 font-medium">{{ pago.monto }} </span>
                </td>
                <td class="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                  <time>{{ pago.fecha_operacion }}</time>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="bg-white divide-y divide-gray-200">
              <tr class="bg-white">
                <td class="max-w-0 w-full  whitespace-nowrap text-sm text-gray-900" colspan="6">
                  <div class="flex item-center text-center justify-center w-full px-6 py-4 text-gray-500">
                    No se encontraron registros
                  </div>
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
