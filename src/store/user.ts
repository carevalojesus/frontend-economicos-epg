import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import type { GrupoModel, PermissionsModel, UserModel } from '~/interfaces/models'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as UserModel,
      groups: [] as GrupoModel[],
      permissions: [] as PermissionsModel[],
    }
  },
  getters: {
    get_full_name: (state) => {
      return `${state.user.first_name} ${state.user.last_name}`
    },

    get_short_name: (state) => {
      if (!state.user)
        return ''
      let first_name = state.user.first_name || ''
      let last_name = state.user.last_name || ''
      if (first_name)
        first_name = first_name.split(' ')[0]
      if (last_name)
        last_name = last_name.split(' ')[0]

      return `${first_name} ${last_name}`
    },

    get_char_full_name: (state) => {
      if (!state.user)
        return ''
      let first_name = state.user.first_name || ''
      let last_name = state.user.last_name || ''
      if (first_name)
        first_name = first_name.charAt(0)
      if (last_name)
        last_name = last_name.charAt(0)

      return `${first_name}${last_name}`
    },
  },
  actions: {
    async save_to_local_storage(payload: string) {
      return new Promise((resolve, reject) => {
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
        })
        const { token, user, groups, permissions } = data
        await this.save_to_local_storage(token)
        this.user = user
        this.groups = groups
        this.permissions = permissions
        return { status, data }
      }
      catch (e) {
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
