import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import type { PagoModel } from '~/interfaces/models'

export const UsePagoStore = defineStore('pago', {
  state: () => {
    return {
      pagos: [] as PagoModel[],
    }
  },
  getters: {},
  actions: {
    async set_pagos(search: string) {
      try {
        const params = {
          search,
        }
        const { data } = await axios.get('/economicos/pagos-filter/', { params })
        this.pagos = data
      }
      catch (e) {
        return null
      }
    },
    async save_pagos(pagos: PagoModel[]) {
      try {
        const response = await axios.post('/economicos/import_pagos/', pagos)
        return response
      }
      catch (e) {
        return null
      }
    },
    async set_concepto_by_id(id: number) {
      try {
        const { data } = await axios.get(`economicos/pagos/${id}/`)
        return data
      }
      catch (e) {
        return null
      }
    },
    async set_pagos_sin_conciliar(search: string) {
      try {
        const params = {
          search,
        }
        const { data } = await axios.get('/economicos/pagos-sin-conciliar/', { params })
        this.pagos = data
      }
      catch (e) {
        return null
      }
    },
    async save_pago(pago: PagoModel) {
      try {
        let response = null
        if (pago.id)
          response = await axios.put(`economicos/pagos/${pago.id}/`, pago)
        else
          response = await axios.post('economicos/pagos/', pago)

        return response
      }
      catch (e) {
        return null
      }
    },

    async conciliar_pagos(pagos: PagoModel[]) {
      try {
        const response = await axios.post('economicos/conciliar_pagos/', pagos)
        return response
      }
      catch (e) {
        return null
      }
    },
  },
})
