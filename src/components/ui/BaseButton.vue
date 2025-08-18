<template>
    <button :class="buttonClass" @click="$emit('click')">
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    name: "BaseButton",
    props: {
        variant: { type: String, default: "primary" },
    },
    computed: {
        buttonClass() {
            if (this.variant === "primary") {
                return "border-2 text-white rounded-3xl w-36 h-10 text-lg bg-[#325C5E] hover:bg-[#274749] transition";
            } else if (this.variant === "secondary") {
                return "text-lg text-[#325C5E] hover:underline";
            }
            return "";
        },
    },
};
</script>
