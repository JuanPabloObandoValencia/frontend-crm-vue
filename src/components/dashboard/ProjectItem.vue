<template>
    <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
            <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-gray-700"></span>
                <span class="font-medium text-gray-800">{{ name }}</span>
            </div>
            <span class="text-sm text-gray-500">
                {{ completed }}/{{ total }} tareas
            </span>
        </div>

        <!-- Barra de progreso -->
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-700" :style="{
                width: progress + '%',
                backgroundColor: progress === 100 ? '#000000' : '#325C5E',
            }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    name: String,
    progress: Number,
    completed: Number,
    total: Number,
});
</script>
