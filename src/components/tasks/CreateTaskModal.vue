<template>
    <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h2 class="text-2xl font-semibold text-gray-800">
                        Crear Nueva Tarea
                    </h2>
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
                <!-- Título -->
                <div>
                    <label class="font-semibold text-gray-700">Título de la tarea *</label>
                    <input v-model="form.title" type="text" placeholder="Ej: Diseñar página de inicio"
                        class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none"
                        required />
                </div>

                <!-- Descripción -->
                <div>
                    <label class="font-semibold text-gray-700">Descripción</label>
                    <textarea v-model="form.description" placeholder="Describe los detalles de la tarea..."
                        class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none resize-none"
                        rows="3"></textarea>
                </div>

                <!-- Proyecto / Asignado a -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-gray-700">Proyecto *</label>
                        <select v-model="form.project"
                            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none"
                            required>
                            <option value="">Selecciona un proyecto</option>
                            <option v-for="p in projects" :key="p.id" :value="p.id">
                                {{ p.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="font-semibold text-gray-700">Asignar a</label>
                        <select v-model="form.assignee"
                            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none">
                            <option value="">Selecciona un usuario</option>
                            <option v-for="u in users" :key="u.id" :value="u.id">
                                {{ u.first_name }} {{ u.first_last_name }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Prioridad / Estado -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold text-gray-700">Prioridad *</label>
                        <select v-model="form.priority"
                            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none"
                            required>
                            <option value="">Selecciona prioridad</option>
                            <option v-for="p in priorities" :key="p.id" :value="p.id">
                                {{ p.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="font-semibold text-gray-700">Estado *</label>
                        <select v-model="form.status"
                            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#325C5E] outline-none"
                            required>
                            <option value="">Selecciona estado</option>
                            <option v-for="s in statuses" :key="s.id" :value="s.id">
                                {{ s.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Fecha de vencimiento -->
                <div>
                    <label class="font-semibold text-gray-700">Fecha de vencimiento</label>
                    <div class="relative">
                        <i class="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="date" v-model="form.due_date"
                            class="w-full border border-gray-300 rounded-lg p-2 pl-9 focus:ring-2 focus:ring-[#325C5E] outline-none" />
                    </div>
                </div>

                <!-- Etiquetas -->
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
import { reactive, ref, defineEmits, defineProps, onMounted } from "vue";
import axios from "axios";

const emit = defineEmits(["close", "create"]);
const props = defineProps({
    show: { type: Boolean, default: false },
});

const form = reactive({
    title: "",
    description: "",
    project: "",
    assignee: "",
    priority: "",
    status: "",
    due_date: "",
    tags: "",
});

// -----------------------------------------------------
// Listas dinámicas
// -----------------------------------------------------
const projects = ref<{ id: number; name: string }[]>([]);
const users = ref<{ id: number; first_name: string; first_last_name: string }[]>([]);
const priorities = ref<{ id: number; name: string }[]>([]);
const statuses = ref<{ id: number; name: string }[]>([]);

onMounted(async () => {
    try {
        const [projRes, userRes, prioRes, statRes] = await Promise.all([
            axios.get("/api/projects"),
            axios.get("/api/users"),
            axios.get("/api/task-priorities"),
            axios.get("/api/task-statuses"),
        ]);

        projects.value = projRes.data;
        users.value = userRes.data;
        priorities.value = prioRes.data;
        statuses.value = statRes.data;
    } catch (error: any) {
        console.error("Error al cargar datos:", error.response?.data || error.message);
    }
});

const close = () => emit("close");

const submitForm = async () => {
    try {
        if (!form.title || !form.project || !form.priority || !form.status) {
            alert("Por favor completa los campos obligatorios.");
            return;
        }

        const payload = {
            title: form.title,
            description: form.description,
            projectId: Number(form.project),
            assignedTo: form.assignee ? Number(form.assignee) : null,
            priorityId: Number(form.priority),
            statusId: Number(form.status),
            dueDate: form.due_date || null,
        };

        const res = await axios.post("/api/tasks", payload);
        console.log("Tarea creada:", res.data);

        alert("Tarea creada con éxito");
        emit("create", res.data);
        close();
    } catch (error: any) {
        console.error("Error al crear tarea:", error.response?.data || error.message);
        alert("Ocurrió un error al crear la tarea.");
    }
};
</script>
