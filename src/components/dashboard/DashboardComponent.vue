<template>
    <main class="flex h-screen">
        <div class="w-40 bg-[#DDEED9] border-r border-black-400 flex flex-col">
            <div class="flex items-center justify-center h-16 border-b border-black-400">
                <h1 class="text-3xl font-bold">CRM</h1>
            </div>

            <div class="flex flex-col items-center gap-4 mt-4 text-[#325C5E] font-bold text-xl">
                <div>
                    <button class="flex items-center gap-2">
                        <ChartBarIcon class="w-6 h-6" />
                        Inicio
                    </button>
                </div>

                <div>
                    <button class="flex items-center gap-2">
                        <CurrencyDollarIcon class="w-6 h-6" />
                        Ventas
                    </button>
                </div>
                <div>
                    <button class="flex items-center gap-2">
                        <UsersIcon class="w-6 h-6" />
                        Terceros
                    </button>
                </div>
                <div>
                    <button class="flex items-center gap-2">
                        <FireIcon class="w-6 h-6" />
                        Ofertas
                    </button>
                </div>
                <div>
                    <button class="flex items-center gap-2">
                        <ClipboardDocumentCheckIcon class="w-6 h-6" />
                        Inventario
                    </button>
                </div>
            </div>
            <div class="mt-auto flex justify-center p-4 ">
                <BaseButton variant="primary" @click="logOut">
                    Cerrar sesión
                </BaseButton>
            </div>
        </div>

        <div class="flex-1 flex flex-col">
            <div class="h-16 bg-[#DDEED9] border-b border-black-400 flex items-center justify-between px-4">
                <div class="flex-1 flex justify-center">
                    <input type="text" placeholder="Buscar" class="p-2 w-1/2 border-2 rounded-[10px]" />
                </div>

                <div class="flex items-center justify-center mx-4">
                    <img src="@/assets/imgs/dashboard/profile.png" alt="profile"
                        class="w-12 h-12 rounded-full object-cover" />
                </div>

                <div class="flex flex-col text-right">
                    <h3 class="text-lg">Juan Pablo Obando</h3>
                    <h4>Gerente de Ventas</h4>
                </div>
            </div>

            <div class="flex-1 bg-white p-4 overflow-auto">
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import BaseButton from '../ui/BaseButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const logOut = () => {

    localStorage.removeItem("token");
    router.push({ name: "login" });

};
</script>
