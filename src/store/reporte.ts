import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useReporteStore = defineStore('reporte', {
  state: () => {
    return {
    }
  },
  getters: {
  },
  actions: {
    async get_reporte_economico_alumno_api(numero_documento: string) {
      try {
        const { data } = await axios.get('/reportes/reporte-economico-alumno-api/', { params: { numero_documento } })
        return data
      }
      catch (error) {
        return null
      }
    },
  },
})
