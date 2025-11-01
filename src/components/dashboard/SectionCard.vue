<template>
    <div class="bg-white rounded-xl p-5 shadow">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">{{ title }}</h2>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps({ title: String })
</script>
