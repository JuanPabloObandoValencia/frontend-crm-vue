<template>
    <button :class="buttonClass" @click="$emit('click')">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
    variant?: "primary" | "secondary";
}

const props = defineProps<Props>();
defineEmits(["click"]);

const buttonClass = computed(() => {
    if (props.variant === "primary") {
        return "border-2 text-white rounded-3xl w-36 h-10 text-lg bg-[#325C5E] hover:bg-[#274749] transition";
    } else if (props.variant === "secondary") {
        return "text-lg text-[#325C5E] hover:underline";
    }
    return "";
});
</script>
