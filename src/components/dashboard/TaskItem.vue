<template>
    <div class="bg-white rounded-lg p-4 mb-3 shadow-sm">
        <div class="flex justify-between">
            <h3 class="font-semibold text-gray-800">{{ title }}</h3>
            <span class="text-xs px-2 py-1 rounded bg-purple-100 text-purple-700">{{ status }}</span>
        </div>
        <p class="text-gray-500 text-sm mb-2">{{ subtitle }}</p>
        <div class="flex items-center text-xs text-gray-500 gap-3">
            <span>{{ project }}</span>
            <span class="bg-gray-100 px-2 py-0.5 rounded">{{ priority }}</span>
            <span>{{ dueDate }}</span>
            <span>{{ assignee }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(['title', 'subtitle', 'status', 'project', 'priority', 'dueDate', 'assignee'])
</script>
