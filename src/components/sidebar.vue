<script setup lang="ts">
import { CashIcon, CogIcon, DocumentReportIcon, HomeIcon, QuestionMarkCircleIcon, ShieldCheckIcon, ViewGridAddIcon } from '@heroicons/vue/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const navigation = [
  { name: 'Home', icon: HomeIcon, current: true, href: 'home' },
  {
    name: 'Gestión',
    icon: ViewGridAddIcon,
    current: false,
    children: [
      { name: 'Conceptos', href: 'conceptos' },
      { name: 'Usuarios', href: 'usuarios' },
    ],
  },
  {
    name: 'Pagos',
    icon: CashIcon,
    current: false,
    children: [
      { name: 'Ver Pagos', href: 'ver-pagos' },
      { name: 'Asignar Pagos', href: 'asignar-pagos' },
      { name: 'Importar Pagos', href: 'importar-pagos' },
    ],
  },
  {
    name: 'Reportes',
    icon: DocumentReportIcon,
    current: false,
    children: [
      { name: 'Económico', href: 'reporte-economico' },
      { name: 'Ingresos', href: 'asignar-pagos' },
      { name: 'Programas', href: 'importar-pagos' },
    ],
  },
]
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]
</script>
<template>
  <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
    <div class="flex flex-col flex-grow bg-primary-700 pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg" alt="Easywire logo">
      </div>
      <nav class="mt-5 flex-1 flex flex-col divide-y divide-primary-500 overflow-y-auto" aria-label="Sidebar">
        <div class="px-2 space-y-1">
          <div v-for="item in navigation" :key="item.name">
            <div v-if="!item.children">
              <router-link :to="item.href" :class="[item.current ? 'bg-primary-500 text-white' : 'text-blue-100 hover:text-white hover:bg-cyan-800', 'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
                <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6 text-blue-200" aria-hidden="true" />
                {{ item.name }}
              </router-link>
            </div>
            <Disclosure v-else v-slot="{ open }" as="div">
              <DisclosureButton :class="[item.current ? 'bg-cyan-800 text-white' : 'text-blue-100 hover:text-white hover:bg-primary-500', 'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md']">
                <component :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6 text-blue-200" aria-hidden="true" />
                <span class="flex-1">
                  {{ item.name }}
                </span>
                <svg :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150']" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </DisclosureButton>
              <DisclosurePanel class="space-y-1">
                <DisclosureButton>
                  <router-link v-for="subItem in item.children" :key="subItem.name" as="a" :to="subItem.href" :class="[item.current ? 'bg-primary-500 text-white' : 'text-blue-100 hover:text-white hover:bg-primary-500', 'group w-full inline-flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md']">
                    {{ subItem.name }}
                  </router-link>
                </DisclosureButton>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
        <!--navigation sidebar-->
        <div class="mt-6 pt-6">
          <div class="px-2 space-y-1">
            <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-700">
              <component :is="item.icon" class="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
              {{ item.name }}
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
