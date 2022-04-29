<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import { CashIcon } from '@heroicons/vue/solid'
import {
  Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions, Dialog,
  DialogOverlay, TransitionChild, TransitionRoot,
} from '@headlessui/vue'
import type { ConceptoModel, ProgramaModel } from '~/interfaces/models'
import { UseConceptoStore } from '~/store/concepto'
import { UseProgramaStore } from '~/store/programa'

const estadoEstilo = {
  activo: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
}

const query = ref('')
const open = ref(false)
const conceptoStr = ref('')
const conceptoStore = UseConceptoStore()
const programaStore = UseProgramaStore()
const programaSelected = ref({} as ProgramaModel)
const conceptoModel = ref<ConceptoModel>({
  id: 0,
  codigo: '',
  nombre: '',
  precio: 0,
  is_active: true,
  programa: 0,
})

onMounted(() => {
  conceptoStore.set_conceptos('')
  programaStore.set_programas()
})

const eventCancel = async() => {
  conceptoModel.value = ({
    id: 0,
    codigo: '',
    nombre: '',
    precio: 0,
    is_active: true,
    programa: 0,
  })
  open.value = false
  programaSelected.value = {} as ProgramaModel
}

watch(open, (val) => {
  if (!val)
    eventCancel()
})

const eventsave = async() => {
  if (!programaSelected.value)
    conceptoModel.value.programa = 0
  else
    conceptoModel.value.programa = programaSelected.value.id

  await conceptoStore.save_concepto(conceptoModel.value)

  createToast('Concepto guardado', {
    type: 'success',
    timeout: 1000,
  })

  conceptoStore.set_conceptos('')
  open.value = false
}
const eventEdit = async(id: number) => {
  const concepto = await conceptoStore.set_concepto_by_id(id)
  conceptoModel.value.id = concepto.id
  conceptoModel.value.codigo = concepto.codigo
  conceptoModel.value.nombre = concepto.nombre
  conceptoModel.value.precio = concepto.precio
  conceptoModel.value.is_active = concepto.is_active
  programaSelected.value = programaStore.find_programa_by_id(concepto.programa) || {} as ProgramaModel
  open.value = true
}
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
              <input
                id="buscar" v-model="conceptoStr" type="search" name="buscar"
                class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Buscar concepto" @input="conceptoStore.set_conceptos(conceptoStr)"
              >
            </div>
            <button
              type="button"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="open = true"
            >
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
                <th
                  class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                >
                  ESTADO
                </th>
                <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CODIGO
                </th>
              </tr>
            </thead>
            <tbody v-if="conceptoStore.conceptos.length > 0" class="bg-white divide-y divide-gray-200">
              <tr v-for="(concepto) in conceptoStore.conceptos" :key="concepto.id" class="bg-white">
                <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex">
                    <a href="#" class="group inline-flex space-x-2 truncate text-sm" @click="eventEdit(concepto.id)">
                      <CashIcon
                        class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <p class="text-gray-500 truncate group-hover:text-gray-900">
                        {{ concepto.nombre }}
                      </p>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  S/
                  <span class="text-gray-900 font-medium">{{ concepto.precio }} </span>
                </td>
                <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                  <span
                    v-if="concepto.is_active"
                    :class="[estadoEstilo['activo'], 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize']"
                  >
                    ACTIVO
                  </span>
                  <span
                    v-else
                    :class="[estadoEstilo['failed'], 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize']"
                  >
                    INACTIVO
                  </span>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  <time>{{ concepto.codigo }}</time>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="bg-white divide-y divide-gray-200">
              <tr class="bg-white">
                <td class="max-w-0 w-full  whitespace-nowrap text-sm text-gray-900" colspan="4">
                  <div class="flex item-center text-center justify-center w-full px-6 py-4 text-gray-500">
                    No se encontraron Datos
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <nav
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
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
              <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Anterior </a>
              <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Siguiente </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!--modal-->
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild
          as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template" enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <!-- contenido-->
            <form action="#" method="POST">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      <span v-if="conceptoModel.id == 0">Nuevo</span> <span v-else>Modificar</span> concepto
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      POSTGRADO-UNAP
                    </p>
                  </div>

                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="codigo-pago" class="block text-sm font-medium text-gray-700">Código de banco</label>
                      <input
                        id="codigo-pago" v-model="conceptoModel.codigo" type="text" name="codigo-pago"
                        autocomplete="off"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-info focus:border-info sm:text-sm"
                      >
                    </div>

                    <Combobox v-model="programaSelected" as="div" class="col-span-6">
                      <ComboboxLabel class="block text-sm font-medium text-gray-700">
                        Asignar programa
                      </ComboboxLabel>
                      <div class="relative mt-1">
                        <ComboboxInput
                          class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-info focus:outline-none focus:ring-1 focus:ring-info sm:text-sm"
                          autocomplete="off" :display-value="(programa) => programa.nombre || ''"
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
                    <div class="col-span-6">
                      <label for="concepto" class="block text-sm font-medium text-gray-700">Concepto</label>
                      <input
                        id="concepto" v-model="conceptoModel.nombre" type="text" name="concepto" autocomplete="of"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-info focus:border-info sm:text-sm"
                      >
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="costo" class="block text-sm font-medium text-gray-700">Costo</label>
                      <input
                        id="costo" v-model="conceptoModel.precio" type="number" name="costo" autocomplete="of"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-info focus:border-info sm:text-sm"
                      >
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="country" class="block text-sm font-medium text-gray-700">Estado</label>
                      <select
                        id="country" v-model="conceptoModel.is_active" name="country" autocomplete="of"
                        class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-info focus:border-info sm:text-sm"
                      >
                        <option value="true">
                          Activo
                        </option>
                        <option value="false">
                          Inactivo
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-info text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-info sm:ml-3 sm:w-auto sm:text-sm"
                @click="eventsave()"
              >
                Guardar
              </button>
              <button
                ref="cancelButtonRef" type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-info sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="eventCancel()"
              >
                Cancelar
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
