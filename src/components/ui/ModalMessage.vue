<template>
    <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white/90 rounded-[32px] shadow-2xl max-w-md w-full p-6 flex flex-col gap-4 relative"
            role="dialog" aria-modal="true" :aria-labelledby="modalTitleId">
            <button @click="closeModal"
                class="absolute top-4 right-4 text-[#325C5E] hover:text-red-500 text-2xl font-bold"
                aria-label="Cerrar ventana">
                &times;
            </button>

            <h2 :id="modalTitleId" class="text-2xl font-bold text-[#325C5E] text-center">
                {{ title }}
            </h2>

            <div class="text-[#325C5E] text-center">
                <p v-for="(msg, index) in messages" :key="index">
                    {{ msg }}
                </p>
            </div>

            <div class="flex justify-center mt-4">
                <button @click="closeModal"
                    class="px-6 py-2 rounded-3xl bg-[#325C5E] text-white font-semibold hover:bg-[#264547] transition">
                    Aceptar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

// Definir las propiedades con tipado mejorado
const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: "Mensaje",
    },
    messages: {
        type: Array as () => string[],
        default: () => [],
    },
});

// Definir los eventos que puede emitir el componente
const emit = defineEmits(["update:show", "close"]);

// ID para accesibilidad
const modalTitleId = computed(() => `modal-title-${Math.random().toString(36).substring(2, 9)}`);

// Función para cerrar la modal
const closeModal = () => {
    emit("update:show", false);
    emit("close");
};
</script>