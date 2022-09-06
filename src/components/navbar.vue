<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import {
  MenuAlt1Icon,
} from '@heroicons/vue/outline'
import {
  ChevronDownIcon,
} from '@heroicons/vue/solid'
import { useUserStore } from '~/store/user'
const userStore = useUserStore()
const persona = ref ('')
const rol = ref('')
const avatar = ref ('')

onMounted(async() => {
  persona.value = userStore.get_full_name
  rol.value = userStore.groups[0].name
  avatar.value = userStore.get_char_full_name
})
</script>
<template>
  <div class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
    <button type="button" class="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden" @click="sidebarOpen = true">
      <span class="sr-only">Open sidebar</span>
      <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <!-- Search bar -->
    <div class="flex-1 px-4 flex justify-end sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div class="ml-4 flex items-center md:ml-6">
        <!-- Profile dropdown -->
        <Menu as="div" class="ml-3 relative">
          <div>
            <MenuButton class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none ">
              <a href="#" class="flex-shrink-0 group block">
                <div class="flex items-center">
                  <div class=" text-right">
                    <p class="text-sm font-medium text-gray-700 group-hover:text-gray-700">{{ persona }}</p>
                    <p class="text-xs font-medium text-green-500">{{ rol }}</p>
                  </div>
                  <span class="ml-3 inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-500">
                    <span class="text-sm font-medium leading-none text-white"> {{ avatar }} </span>
                  </span>
                </div>
              </a>
              <ChevronDownIcon class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block" aria-hidden="true" />
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Perfil</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Configuración</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="/" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-500']">Cerrar sesión</a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>
