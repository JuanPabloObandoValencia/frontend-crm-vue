<template>
    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-3 shadow-sm hover:shadow transition-all duration-200">
        <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-800">{{ title }}</h3>

            <!-- Estado con color dinámico -->
            <span class="text-xs font-semibold px-3 py-1 rounded-full" :style="{
                backgroundColor: status?.color + '1A', // fondo suave (10%)
                color: status?.color,
                border: '1px solid ' + status?.color + '40',
            }">
                {{ status?.name }}
            </span>
        </div>

        <p class="text-gray-600 text-sm mb-3">{{ subtitle }}</p>

        <div class="flex flex-wrap justify-between text-sm text-gray-500">
            <div class="flex items-center space-x-1">
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: projectColor }"></span>
                <span>{{ project }}</span>
            </div>

            <span class="font-semibold" :style="{ color: priority?.color }">
                {{ priority?.name }}
            </span>

            <span v-if="dueDate" class="text-gray-500">{{ formatDate(dueDate) }}</span>

            <span v-if="assignee" class="flex items-center space-x-1">
                <i class="ri-user-line text-gray-400"></i>
                <span>{{ assignee }}</span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
    subtitle: String,
    status: Object,
    project: String,
    priority: Object,
    dueDate: String,
    assignee: String,
});

const projectColor = "#374151";

const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
    });
};
</script>
