<template>
    <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h2 class="text-2xl font-semibold text-gray-800">Crear Nueva Tarea</h2>
                    <p class="text-gray-500 text-sm">
                        Completa los detalles de la tarea para agregarla al proyecto.
                    </p>
                </div>
                <button @click="close" class="text-gray-500 hover:text-gray-800 text-xl font-bold">
                    ×
                </button>
            </div>

            <!-- Formulario -->
            <form @submit.prevent="submitForm" class="space-y-5">
                <div>
                    <label class="font-semibold text-gray-700">Título de la tarea *</label>
                    <input v-model="form.title" type="text" placeholder="Ej: Diseñar página de inicio"
                        class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none"
                        required />
                </div>

                <div>
                    <label class="font-semibold text-gray-700">Descripción</label>
                    <textarea v-model="form.description" placeholder="Describe los detalles de la tarea..."
                        class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none resize-none"
                        rows="3"></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-gray-700">Proyecto *</label>
                        <select v-model="form.project"
                            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none"
                            required>
                            <option value="">Selecciona un proyecto</option>
                            <option>Desarrollo Web</option>
                            <option>Marketing Digital</option>
                            <option>Diseño UX/UI</option>
                        </select>
                    </div>

                    <div>
                        <label class="font-semibold text-gray-700">Asignar a</label>
                        <select v-model="form.assignee"
                            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none">
                            <option value="">Selecciona un usuario</option>
                            <option>Juan Pérez</option>
                            <option>Ana Gómez</option>
                            <option>Pedro Ruiz</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-gray-700">Prioridad</label>
                        <select v-model="form.priority"
                            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none">
                            <option>Baja</option>
                            <option>Media</option>
                            <option>Alta</option>
                        </select>
                    </div>

                    <div>
                        <label class="font-semibold text-gray-700">Estado</label>
                        <select v-model="form.status"
                            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none">
                            <option>Por Hacer</option>
                            <option>En Progreso</option>
                            <option>Completada</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="font-semibold text-gray-700">Fecha de vencimiento</label>
                    <div class="relative">
                        <i class="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="date" v-model="form.due_date"
                            class="w-full border border-gray-300 rounded-lg p-2 pl-9 focus:ring-2 focus:ring-[#325C5E] outline-none" />
                    </div>
                </div>

                <div>
                    <label class="font-semibold text-gray-700">Etiquetas</label>
                    <input v-model="form.tags" type="text"
                        placeholder="Ej: diseño, frontend, urgente (separadas por comas)"
                        class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none" />
                </div>

                <!-- Botones -->
                <div class="flex justify-end space-x-3 pt-3">
                    <button type="button" @click="close"
                        class="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition">
                        Cancelar
                    </button>
                    <button type="submit" class="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition">
                        Crear Tarea
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits } from 'vue'

const emit = defineEmits(['close', 'create'])
const props = defineProps({
    show: { type: Boolean, default: false },
})

const form = reactive({
    title: '',
    description: '',
    project: '',
    assignee: '',
    priority: 'Media',
    status: 'Por Hacer',
    due_date: '',
    tags: '',
})

const close = () => emit('close')

const submitForm = () => {
    emit('create', { ...form })
    close()
}
</script>
