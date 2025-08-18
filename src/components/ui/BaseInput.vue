<template>
    <div
        class="flex items-center w-full md:w-80 h-12 border-2 shadow-sm mt-4 mb-4 px-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#325C5E]">
        <component :is="leftIcon" class="h-8 w-8 text-[#325C5E]" v-if="leftIcon" />
        <input :type="type" :placeholder="placeholder" class="md:w-80 px-3 focus:outline-none flex-1" />
        <component :is="rightIcon" class="h-8 w-8 text-[#325C5E]" v-if="rightIcon" />
    </div>
</template>

<script lang="ts">
export default {
    name: "BaseInput",
    props: {
        type: { type: String, default: "text" },
        placeholder: { type: String, default: "" },
        leftIcon: { type: String, default: null },   // nombre del icono global
        rightIcon: { type: String, default: null },  // nombre del icono global
    },
};
</script>
