<template>
    <main
        class="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 bg-cover bg-center bg-no-repeat bg-[url('@/assets/imgs/login/background.png')]">
        <div
            class="flex flex-col justify-center items-center w-full max-w-4xl sm:max-w-2xl lg:max-w-3xl p-6 sm:p-10 shadow-2xl bg-white rounded-[32px]">
            <h1 class="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-[#325C5E] mb-6">¡Regístrate!</h1>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <BaseInput type="text" placeholder="Primer nombre" />
                <BaseInput type="text" placeholder="Segundo nombre" />
                <BaseInput type="text" placeholder="Primer apellido" />
                <BaseInput type="text" placeholder="Segundo apellido" />
                <BaseInput type="email" placeholder="Correo" />
                <BaseInput type="tel" placeholder="Teléfono" />
                <BaseInput type="password" placeholder="Contraseña" rightIcon="EyeIcon" />
                <BaseInput type="password" placeholder="Confirmar contraseña" rightIcon="EyeIcon" />
            </div>
            <div class="mt-6 w-44">
                <BaseButton variant="primary" class="w-full">Registrarse</BaseButton>
                <BaseButton variant="secondary" class="w-full mt-4" @click="goToLogin">Iniciar sesión</BaseButton>
            </div>
        </div>
    </main>
</template>

<script>
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useRouter } from "vue-router";

export default {

    name: "UserSigin",
    components: {
        BaseInput,
        BaseButton,
    },

    setup() {

        const router = useRouter();

        const goToLogin = () => {

            router.push({ name: "login" });

        };

        return {

            goToLogin

        };

    }

};
</script>
