<template>
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
        <!-- Botón superior -->
        <div class="p-4">
            <button @click="showModal = true"
                class="w-full bg-black text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                <span class="text-lg">+</span>
                Nueva Tarea
            </button>
        </div>

        <!-- Navegación -->
        <nav class="flex-1 mt-2">
            <ul class="flex flex-col">
                <li v-for="item in menu" :key="item.label" class="mb-1">
                    <RouterLink :to="item.to"
                        class="flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition" :class="[
                            isActive(item.to)
                                ? 'bg-[#325C5E] text-white'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-[#325C5E]',
                        ]">
                        <component :is="item.icon" class="w-5 h-5"
                            :class="isActive(item.to) ? 'text-white' : 'text-gray-800'" />
                        {{ item.label }}
                    </RouterLink>
                </li>
            </ul>
        </nav>

        <!-- Footer -->
        <div class="p-4 mt-auto border-t border-gray-200 text-center text-xs text-gray-500">
            v1.0.0 - TaskFlow CRM
        </div>
    </aside>

    <!-- Modal -->
    <CreateTaskModal :show="showModal" @close="showModal = false" @create="handleCreateTask" />
</template>


<script setup lang="ts">
import {
    Squares2X2Icon,
    ClipboardDocumentListIcon,
    FolderIcon,
    UsersIcon,
    Cog6ToothIcon,
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import CreateTaskModal from '@/components/tasks/CreateTaskModal.vue'

const route = useRoute()
const showModal = ref(false)

const menu = [
    { label: 'Dashboard', to: '/dashboard', icon: Squares2X2Icon },
    { label: 'Tablero Kanban', to: '/kanban', icon: ClipboardDocumentListIcon },
    { label: 'Proyectos', to: '/projects', icon: FolderIcon },
    { label: 'Equipo', to: '/team', icon: UsersIcon },
    { label: 'Configuración', to: '/settings', icon: Cog6ToothIcon },
]

const isActive = (path: string) => route.path === path

const handleCreateTask = (task: any) => {
    console.log('Nueva tarea creada:', task)
    showModal.value = false
}
</script>
