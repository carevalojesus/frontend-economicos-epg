<script setup lang="ts" >
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

const promocion = ref('')
const query = ref('')
// #const programa_id = ref('7')
const reportStore = useReporteStore()
const programaStore = UseProgramaStore()
const programaSelected = ref({} as ProgramaModel)
const report_obj = ref(null)

onMounted(() => {
  programaStore.set_programas()
})

const get_reporte_pensiones_alumno = async(programa_id: any) => {
  if (programa_id == null)
    programa_id = ''

  const { status, data } = await reportStore.get_reporte_pensiones_programas_excel(programa_id, promocion.value) || {}
  if (status !== 200) {
    createToast('Error al exportar excel', {
      type: 'danger',
      hideProgressBar: true,
    })
    return
  }
  if (data.cantidad === 0) {
    createToast('No hay registros para exportar', {
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
              Reporte De Pensiones Por Programas
            </h2>
          </div>
          <div class="mt-4 flex-shrink-0 flex md:mt-0 md:justify-between">
            <div class="flex flex-col w-10/12">
              <div class="flex flex-row">
                <div class="pr-12 w-10/12">
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
                <div class="pr-12 w-2/12">
                  <label for="promocion" class="text-xs">Promoción:</label>
                  <input
                    id="promocion" v-model="promocion" type="text" name="promocion"
                    class="mt-0 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                </div>
              </div>
            </div>
            <div class=" flex flex-row w-10/12 w-2/12">
              <div class="md:items-center ">
                <button
                  type="button"
                  class="ml-0 w-full items-center px-4 border border-transparent mt-9 rounded-md shadow-sm font-medium text-white bg-primary-500 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="get_reporte_pensiones_alumno(programaSelected.id)"
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=" md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200" />
    </div>
  </div>
</template>
