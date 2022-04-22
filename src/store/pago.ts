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
        const { data } = await axios.get('/economicos/pagos/', { params })
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
  },
})
