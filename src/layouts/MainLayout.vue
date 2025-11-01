<template>
    <main class="flex h-screen">
        <SidebarComponent />

        <div class="flex-1 flex flex-col">
            <TopbarComponent />

            <section class="flex-1 bg-white p-4 overflow-auto">
                <slot />
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue'
import TopbarComponent from '@/components/TopbarComponent.vue'
</script>
