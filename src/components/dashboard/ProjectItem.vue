<template>
    <div class="mb-4">
        <div class="flex justify-between mb-1">
            <span class="text-gray-700 font-medium">{{ name }}</span>
            <span class="text-sm text-gray-500">{{ progress }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gray-800 h-2 rounded-full" :style="{ width: progressWidth }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    name: String,
    progress: {
        type: String,
        default: '0/1'
    }
})

const [done, total] = props.progress.split('/').map(Number)
const progressWidth = `${(done / total) * 100}%`
</script>
