import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useReporteStore = defineStore('reporte', {
  state: () => {
    return {
    }
  },
  getters: {
    get_media_url: () => (media: string) => {
      const url = import.meta.env.DEV ? import.meta.env.VITE_APP_URL_LOCAL : import.meta.env.VITE_APP_URL_PRODUCCION
      return url.substring(0, url.length - 1) + media
    },
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
    async get_reporte_programas_excel(programa_id: string, fecha: string) {
      try {
        const { status, data } = await axios.get('/reportes/get_reporte_programas_excel/', {
          params: {
            programa_id,
            fecha,
          },
        })
        return { status, data }
      }
      catch (error) {
        return null
      }
    },
    async get_reporte_economico_alumno_pdf(numero_documento: string) {
      try {
        const obj = {
          numero_documento,
        }
        const { status, data } = await axios.post('/reportes/get_reporte_economico_alumno_pdf/', obj)
        return { status, data }
      }
      catch (error) {
        return null
      }
    },
  },
})
