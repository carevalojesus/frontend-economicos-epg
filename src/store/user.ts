import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import type { GrupoModel, PermissionsModel, UserModel } from '~/interfaces/models'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as UserModel,
      groups: [] as GrupoModel[],
      permissions: [] as PermissionsModel[],
      persona_id: 0,
      persona_nombres: '',
      persona_apellido_paterno: '',
    }
  },
  getters: {
    get_full_name: (state) => {
      return `${state.persona_nombres} ${state.persona_apellido_paterno}`
    },
    get_short_name: (state) => {
      if (!state.user)
        return ''
      let first_name = state.persona_nombres || ''
      let last_name = state.persona_apellido_paterno || ''
      if (first_name)
        first_name = first_name.split(' ')[0]
      if (last_name)
        last_name = last_name.split(' ')[0]

      return `${first_name} ${last_name}`
    },

    get_char_full_name: (state) => {
      if (!state.user)
        return ''
      let first_name = state.persona_nombres || ''
      let last_name = state.persona_apellido_paterno || ''
      if (first_name)
        first_name = first_name.charAt(0)
      if (last_name)
        last_name = last_name.charAt(0)

      return `${first_name}${last_name}`
    },
  },
  actions: {
    async save_to_local_storage(payload: string) {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('userpgtoken', payload)
          resolve(true)
        }, 500)
      },
      )
    },

    async login(email: string, password: string) {
      try {
        const { status, data } = await axios.post('/accounts/login/', {
          email,
          password,
          cliente: import.meta.env.VITE_APP_CLIENTE_KEY,
        })
        const { token, user, groups, permissions, persona_id, persona_nombres, persona_apellido_paterno } = data
        await this.save_to_local_storage(token)
        this.user = user
        this.groups = groups
        this.permissions = permissions
        this.persona_id = persona_id
        this.persona_nombres = persona_nombres
        this.persona_apellido_paterno = persona_apellido_paterno
        return { status, data }
      }
      catch (e: any) {
        return { status: e.response.status, data: e.response.data }
      }
    },

    async get_user_data_by_token() {
      try {
        const token = localStorage.getItem('userpgtoken') as string
        const { data } = await axios.post('/accounts/get_user_data_by_token/', {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        const { user, groups } = data
        this.user = user
        this.groups = groups
        return data
      }
      catch (e) {
        return null
      }
    },
  },
})
