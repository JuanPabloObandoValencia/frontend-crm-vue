<template>
    <div
        class="flex items-center w-full md:w-80 h-12 border-2 shadow-sm mt-4 mb-4 px-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#325C5E]">

        <component :is="leftIcon" class="h-8 w-8 text-[#325C5E]" v-if="leftIcon" />

        <input :type="inputType" :placeholder="placeholder" class="md:w-80 px-3 focus:outline-none flex-1"
            :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />

        <component :is="currentIcon" class="h-8 w-8 text-[#325C5E] cursor-pointer" v-if="rightIcon"
            @click="togglePassword" />
    </div>
</template>

<script setup lang="ts">

import { defineProps, defineEmits, ref, computed } from "vue";

const props = defineProps({
    modelValue: { type: String, default: "" },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    leftIcon: { type: String, default: null },
    rightIcon: { type: String, default: null },
});

const emit = defineEmits(["update:modelValue"]);

const showPassword = ref(false);

const inputType = computed(() => {

    if (props.type === "password") {

        return showPassword.value ? "text" : "password";

    }

    return props.type;

});

const currentIcon = computed(() => {

    if (props.type === "password" && props.rightIcon === "EyeIcon") {

        return showPassword.value ? "EyeSlashIcon" : "EyeIcon";

    }

    return props.rightIcon;

});

const togglePassword = () => {

    if (props.type === "password") {

        showPassword.value = !showPassword.value;

    }

};

</script>
