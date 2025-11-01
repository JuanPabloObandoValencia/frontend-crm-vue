<template>
    <div class="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-200">
        <div class="text-gray-700 font-medium mb-2">{{ title }}</div>

        <div class="flex items-center justify-center gap-2">
            <span class="text-3xl font-bold text-gray-900">{{ value }}</span>
            <i v-if="icon" :class="[icon, colorClass, 'text-2xl']"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
    value: [String, Number],
    icon: String,
    color: { type: String, default: 'blue' }
})

const colorClass = {
    blue: 'text-blue-500',
    orange: 'text-orange-400',
    purple: 'text-purple-500',
    green: 'text-green-500'
}[props.color]
</script>
