import { defineStore } from 'pinia'
import service from '../plugins/axios'
import type { ConceptoModel } from '~/interfaces/models'

export const UseConceptoStore = defineStore('concepto', {
  state: () => {
    return {
      conceptos: [] as ConceptoModel[],
    }
  },
  getters: {
    get_concepto_by_codigo: state => (codigo: string, monto: number) => {
      return state.conceptos.find(concepto => Number(concepto.codigo) === Number(codigo) && Number(concepto.precio) === Number(monto))
    },
    filter_conceptos_by_nombre: state => (nombre: string) => {
      return state.conceptos.filter(concepto => concepto.nombre.toLowerCase().includes(nombre.toLowerCase()))
    },
    find_conceptos_by_id: state => (id: number) => {
      return state.conceptos.find(row => row.id === id) as ConceptoModel
    },
  },
  actions: {
    async set_conceptos(search: string) {
      try {
        const params = {
          search,
        }
        const { data } = await service.get('economicos/conceptos/', { params })
        this.conceptos = data
      }
      catch (e) {
        return null
      }
    },
    async set_concepto_by_id(id: number) {
      try {
        const { data } = await service.get(`economicos/conceptos/${id}/`)
        return data
      }
      catch (e) {
        return null
      }
    },
    async save_concepto(concepto: ConceptoModel) {
      try {
        let response = null
        if (concepto.id)
          response = await service.put(`economicos/conceptos/${concepto.id}/`, concepto)
        else
          response = await service.post('economicos/conceptos/', concepto)
        return response
      }
      catch (e) {
        return null
      }
    },

  },
})
