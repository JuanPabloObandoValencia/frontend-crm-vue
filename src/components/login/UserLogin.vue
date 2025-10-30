<template>
    <main
        class="flex flex-col lg:flex-row items-center justify-center h-screen lg:gap-32 px-6 bg-cover bg-center bg-no-repeat bg-[url('@/assets/imgs/login/background.png')]">

        <div
            class="w-full max-w-md h-[550px] p-6 flex flex-col justify-center gap-6 border-2 rounded-[32px] bg-white/90 shadow-2xl">
            <h1 class="text-center text-2xl md:text-4xl lg:text-5xl text-[#325C5E] font-bold">Iniciar sesión</h1>

            <div class="flex flex-col items-center justify-center w-full gap-4">
                <BaseInput v-model="form.email" type="email" placeholder="Correo" leftIcon="UserIcon" :required="true"
                    :touched="touched.email" class="w-full" />

                <BaseInput v-model="form.password" type="password" placeholder="Contraseña" leftIcon="LockClosedIcon"
                    rightIcon="EyeIcon" :required="true" :touched="touched.password" class="w-full" />

                <div class="mt-2 w-full text-center">
                    <p class="text-sm text-[#325C5E] cursor-pointer hover:underline">Olvidé mi contraseña</p>
                </div>

                <div class="flex flex-col mt-6 gap-4 w-full">
                    <BaseButton variant="primary" class="w-full" @click="submitLogin">Ingresar</BaseButton>
                    <BaseButton variant="secondary" class="w-full" @click="goToRegister">Registrar</BaseButton>
                </div>
            </div>
        </div>

        <div class="hidden lg:block mt-6 w-[30%]">
            <h1 class="text-4xl xl:text-5xl text-[#325C5E] font-bold leading-tight">¡Bienvenido al CRM!</h1>
            <p class="text-lg xl:text-2xl text-[#325C5E] font-semibold mt-4">
                Inicia sesión y vive la experiencia completa, o crea tu cuenta en segundos.
            </p>
            <img src="@/assets/imgs/login/image-login.png" alt="img" class="mt-4">
        </div>

        <SimpleModal :show="showErrorModal" :title="modalTitle" :messages="modalMessages"
            @close="showErrorModal = false" />
    </main>
</template>

<script lang="ts" setup>

    import { ref } from "vue";
    import { useRouter, type Router } from "vue-router";
    import axios from "axios";
    import BaseInput from "@/components/ui/BaseInput.vue";
    import BaseButton from "@/components/ui/BaseButton.vue";
    import SimpleModal from "@/components/ui/ModalMessage.vue";
    const router: Router = useRouter();

    const form = ref({
        email: "",
        password: ""
    });

    const touched = ref({
        email: false,
        password: false
    });

    const showErrorModal = ref(false);
    const modalTitle = ref("Error");
    const modalMessages = ref<string[]>([]);

    const goToRegister = () => {

        router.push({ name: "signIn" });

    };

    const submitLogin = async () => {

        touched.value.email = true;
        touched.value.password = true;

        if (!form.value.email || !form.value.password) {

            modalTitle.value = "Faltan datos";
            modalMessages.value = ["Por favor, completa todos los campos."];
            showErrorModal.value = true;

            return;

        }

        try {

            const { email, password } = form.value;
            const response = await axios.post("/api/auth/login", { email, password });

            localStorage.setItem("token", response.data.access_token);

            router.push({ name: "dashboard" });

        } catch (error: any) {

            if (axios.isAxiosError(error) && error.response) {

                modalTitle.value = "Error de inicio de sesión";
                modalMessages.value = ["Usuario o contraseña incorrectos."];
                showErrorModal.value = true;

            } else {

                modalTitle.value = "Error inesperado";
                modalMessages.value = ["Hubo un problema. Por favor, inténtalo de nuevo más tarde."];
                showErrorModal.value = true;

            }

        }

    };

</script>