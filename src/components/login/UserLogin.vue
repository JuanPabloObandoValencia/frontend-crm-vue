<template>
    <main
        class="flex flex-col lg:flex-row items-center justify-center h-screen lg:gap-32 px-6 bg-cover bg-center bg-no-repeat bg-[url('@/assets/imgs/login/background.png')]">
        <div
            class="w-full max-w-md h-[550px] p-6 flex flex-col justify-center gap-6 border-2 rounded-[32px] bg-white/90 shadow-2xl">
            <h1 class="text-center text-2xl md:text-4xl lg:text-5xl text-[#325C5E] font-bold">Iniciar sesión</h1>

            <div class="flex flex-col items-center justify-center">
                <BaseInput v-model="form.email" type="email" placeholder="Correo" leftIcon="UserIcon" />
                <BaseInput v-model="form.password" type="password" placeholder="Contraseña" leftIcon="LockClosedIcon"
                    rightIcon="EyeIcon" />

                <div class="mt-2">
                    <p class="text-sm text-[#325C5E] cursor-pointer hover:underline">Olvidé mi contraseña</p>
                </div>

                <div class="flex flex-col mt-8 gap-4">
                    <BaseButton variant="primary" @click="submitLogin">Ingresar</BaseButton>
                    <BaseButton variant="secondary" @click="goToRegister">Registrar</BaseButton>
                </div>
            </div>
        </div>

        <div class="hidden lg:block mt-6 w-[30%]">
            <h1 class="text-4xl xl:text-5xl text-[#325C5E] font-bold leading-tight">¡Bienvenido al CRM!</h1>
            <p class="text-lg xl:text-2xl text-[#325C5E] font-semibold mt-4">
                Inicia sesión y vive la experiencia completa, o crea tu cuenta en segundos.
            </p>
            <img src="@/assets/imgs/login/image-login.png" alt="img">
        </div>
    </main>
</template>

<script lang="ts" setup>

    import BaseInput from "@/components/ui/BaseInput.vue";
    import BaseButton from "@/components/ui/BaseButton.vue";
    import { useRouter } from "vue-router";
    import type { Router } from "vue-router";
    import { ref } from "vue";
    import  axios  from "axios";

    const router: Router = useRouter();

    const goToRegister = () => {

        router.push({ name: "signIn" })

    }

    const form = ref({
        email: "",
        password: ""
    });

    const submitLogin = async () => {

        try {

            const email = form.value.email;
            const password = form.value.password;

            const response = await axios.post("/api/auth/login", { email, password });

            localStorage.setItem("token", response.data.access_token);

            router.push({ name: "example" });

        } catch (error) {

            console.error(error);

        }

    };

</script>
