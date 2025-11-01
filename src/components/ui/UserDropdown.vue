<template>
    <div class="relative" ref="dropdownRef">
        <!-- Icono de perfil -->
        <button @click="toggleDropdown" class="relative focus:outline-none">
            <i class="ri-user-line text-xl text-gray-700 hover:text-[#325C5E] transition"></i>
        </button>

        <!-- Dropdown -->
        <transition name="fade">
            <div v-if="open"
                class="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-xl border border-gray-200 z-50 overflow-hidden">
                <!-- Header usuario -->
                <div class="flex items-center gap-3 p-4 border-b">
                    <div
                        class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
                        <i class="ri-user-line"></i>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800 leading-tight">
                            {{ user?.first_name }} {{ user?.first_last_name }}
                        </p>
                        <p class="text-sm text-gray-500">{{ user?.email }}</p>
                    </div>
                </div>

                <!-- Estadísticas -->
                <div class="flex justify-around p-4 border-b">
                    <div class="text-center">
                        <p class="font-semibold text-gray-800 text-lg">{{ stats.tasks }}</p>
                        <p class="text-xs text-gray-500">Tareas activas</p>
                    </div>
                    <div class="text-center">
                        <p class="font-semibold text-gray-800 text-lg">{{ stats.projects }}</p>
                        <p class="text-xs text-gray-500">Proyectos</p>
                    </div>
                </div>

                <!-- Opciones -->
                <div class="divide-y">
                    <button v-for="(item, index) in options" :key="index" @click="handleAction(item.action)"
                        class="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        :class="item.danger ? 'text-red-600 hover:bg-red-50' : ''">
                        <i :class="item.icon"></i>
                        {{ item.label }}
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import axios from "@/plugins/axios";

const router = useRouter();
const open = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => (open.value = !open.value);

const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
        open.value = false;
    }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));

const user = ref<{ first_name?: string; first_last_name?: string; email?: string; role?: string }>({});
const stats = ref({ tasks: 0, projects: 0 });

const options = [
    { label: "Mi Perfil", icon: "ri-user-3-line", action: "profile" },
    { label: "Configuración", icon: "ri-settings-3-line", action: "settings" },
    { label: "Cerrar Sesión", icon: "ri-logout-circle-r-line", action: "logout", danger: true },
];

const handleAction = (action: string) => {
    switch (action) {
        case "profile":
            router.push("/profile");
            break;
        case "settings":
            router.push("/settings");
            break;
        case "logout":
            localStorage.removeItem("token");
            router.push("/login");
            break;
    }
    open.value = false;
};

onMounted(async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get("/api/users/me");
        user.value = data;

        const [tasksRes, projectsRes] = await Promise.all([
            axios.get("/api/tasks"),
            axios.get("/api/projects"),
        ]);

        stats.value.tasks = tasksRes.data.length;
        stats.value.projects = projectsRes.data.length;
    } catch (error) {
        console.error("Error cargando datos del usuario:", error);
    }
});
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
