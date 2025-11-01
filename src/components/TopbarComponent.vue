<template>
    <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <!-- Logo -->
        <div class="text-2xl font-bold text-[#325C5E] select-none">
            TaskFlow <span class="text-[#274748]">CRM</span>
        </div>

        <!-- Buscador -->
        <div class="flex items-center justify-center flex-1 px-6">
            <div class="relative w-1/2">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <i class="ri-search-line text-lg"></i>
                </span>
                <input type="text" v-model="search" placeholder="Buscar tareas, proyectos..."
                    class="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#325C5E] transition" />
            </div>
        </div>

        <!-- Iconos -->
        <div class="flex items-center space-x-5">
            <NotificationDropdown />
            <UserDropdown />
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NotificationDropdown from '@/components/ui/NotificationDropdown.vue'
import UserDropdown from '@/components/ui/UserDropdown.vue'

const search = ref('')
</script>
