<template>
    <div class="flex flex-col w-full md:w-80">
        <div class="flex items-center h-12 border-2 shadow-sm px-3 rounded-3xl" :class="{
            'focus-within:ring-2 focus-within:ring-[#325C5E]': true,
            'border-red-500': showValidationError,
        }">
            <component :is="leftIcon" class="h-8 w-8 text-[#325C5E]" v-if="leftIcon" />
            <input :type="computedInputType" :placeholder="placeholder" class="flex-1 px-3 focus:outline-none"
                :value="modelValue" @input="updateValue" />
            <component :is="computedRightIcon" class="h-8 w-8 text-[#325C5E] cursor-pointer" v-if="rightIcon"
                @click="togglePasswordVisibility" />
        </div>
        <p v-if="showValidationError" class="text-red-500 text-sm m-1">
            <span v-if="required && !modelValue">Por favor, completa este campo.</span>
            <span v-else-if="!isValidEmail">Por favor, introduce un correo electrónico válido.</span>
        </p>
    </div>
</template>

<script setup lang="ts">

    import { ref, computed } from "vue";

    const props = defineProps({

        modelValue: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
            validator: (value: string) => ["text", "password", "email"].includes(value),
        },
        placeholder: {
            type: String,
            default: "",
        },
        leftIcon: {
            type: [String, Object],
            default: null,
        },
        rightIcon: {
            type: [String, Object],
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        touched: {
            type: Boolean,
            default: false,
        },

    });

    const emit = defineEmits(["update:modelValue"]);

    const showPassword = ref(false);

    const isValidEmail = computed(() => {

        if (props.type === "email") {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return emailRegex.test(props.modelValue);

        }

        return true;

    });

    const showValidationError = computed(() => {

        const isRequiredAndEmpty = props.required && !props.modelValue && props.touched;

        const isEmailInvalid = props.type === 'email' && !isValidEmail.value && props.modelValue.length > 0;

        return isRequiredAndEmpty || (props.touched && isEmailInvalid);

    });

    const computedInputType = computed(() => {

        if (props.type === "password") {

            return showPassword.value ? "text" : "password";

        }

        return props.type;

    });

    const computedRightIcon = computed(() => {

        if (props.type === "password" && props.rightIcon) {

            return showPassword.value ? "EyeSlashIcon" : "EyeIcon";

        }

        return props.rightIcon;

    });

    const updateValue = (event: Event) => {

        emit("update:modelValue", (event.target as HTMLInputElement).value);

    };

    const togglePasswordVisibility = () => {

        if (props.type === "password") {

            showPassword.value = !showPassword.value;

        }

    };

</script>