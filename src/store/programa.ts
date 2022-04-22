import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import type { ProgramaModel } from '~/interfaces/models'

export const UseProgramaStore = defineStore('programa', {
  state: () => {
    return {
      programas: [] as ProgramaModel[],
    }
  },
  getters: {
    filter_programas_by_nombre: state => (nombre: string) => {
      return state.programas.filter(row => row.is_active && row.nombre.toLowerCase().includes(nombre.toLowerCase()))
    },
    find_programa_by_id: state => (id: number) => {
      return state.programas.find(row => row.id === id) as ProgramaModel
    },
  },
  actions: {
    async set_programas() {
      try {
        const { data } = await axios.get('academicos/programa/')
        this.programas = data
      }
      catch (e) {
        return null
      }
    },
  },
})
