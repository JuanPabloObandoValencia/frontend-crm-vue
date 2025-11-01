<template>
    <div class="relative" ref="dropdownRef">
        <!-- Icono campana -->
        <button @click="toggleDropdown" class="relative focus:outline-none">
            <i class="ri-notification-3-line text-2xl text-gray-700 hover:text-[#325C5E]"></i>

            <!-- Badge rojo -->
            <span v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {{ unreadCount }}
            </span>
        </button>

        <!-- Dropdown -->
        <transition name="fade">
            <div v-if="open"
                class="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl border border-gray-200 z-50 overflow-hidden">
                <div class="flex justify-between items-center px-4 py-2 border-b">
                    <h3 class="font-semibold text-gray-800">Notificaciones</h3>
                    <button @click="markAllAsRead" class="text-sm text-[#325C5E] hover:underline">
                        Marcar todas
                    </button>
                </div>

                <!-- Lista -->
                <div class="max-h-96 overflow-y-auto divide-y">
                    <div v-for="(notification, index) in notifications" :key="index"
                        class="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition">
                        <i :class="[notification.icon, 'text-xl', notification.color]"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800 text-sm">
                                {{ notification.title }}
                            </p>
                            <p class="text-gray-600 text-sm mb-1">
                                {{ notification.message }}
                            </p>
                            <span class="text-xs text-gray-400">{{ notification.time }}</span>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="text-center py-2 border-t text-sm text-[#325C5E] hover:bg-gray-50 cursor-pointer">
                    Ver todas las notificaciones
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => (open.value = !open.value)

// Cierra al hacer clic fuera
const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
        open.value = false
    }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

// Ejemplo de datos de notificaciones
const notifications = ref([
    {
        title: 'Nueva tarea asignada',
        message: "Juan Pérez te asignó 'Diseñar página de inicio'",
        time: 'Hace 11h',
        icon: 'ri-file-list-3-line',
        color: 'text-[#325C5E]',
    },
    {
        title: 'Tarea próxima a vencer',
        message: "La tarea 'Implementar autenticación' vence en 2 días",
        time: 'Hace 12h',
        icon: 'ri-alarm-warning-line',
        color: 'text-yellow-500',
    },
    {
        title: 'Nuevo comentario',
        message: "Ana Martínez comentó en 'Crear contenido para redes sociales'",
        time: 'Hace 13h',
        icon: 'ri-chat-1-line',
        color: 'text-purple-500',
    },
    {
        title: 'Tarea actualizada',
        message: "María García cambió el estado de 'Investigación de usuarios' a Completado",
        time: 'Hace 1d',
        icon: 'ri-refresh-line',
        color: 'text-blue-500',
    },
])

// Cantidad de no leídas
const unreadCount = ref(3)

const markAllAsRead = () => {
    unreadCount.value = 0
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
