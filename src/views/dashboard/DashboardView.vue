<template>
    <MainLayout>
        <div class="p-6  min-h-screen">
            <h1 class="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
            <p class="text-gray-600 mb-6">
                Bienvenido de vuelta. Aquí está el resumen de tus tareas.
            </p>

            <!-- Tarjetas superiores -->
            <div class="grid grid-cols-4 gap-4 mb-6">
                <StatsCard title="Total de Tareas" value="6" icon="ri-list-check-line" />
                <StatsCard title="Por Hacer" value="2" icon="ri-time-line" color="orange" />
                <StatsCard title="En Progreso" value="2" icon="ri-loader-2-line" color="purple" />
                <StatsCard title="Completadas" value="1" icon="ri-checkbox-circle-line" color="green" />
            </div>

            <!-- Contenido principal -->
            <div class="grid grid-cols-3 gap-4">
                <SectionCard title="Tareas Recientes" class="col-span-2">
                    <TaskItem title="Documentación API" subtitle="Escribir documentación completa de los endpoints"
                        status="En Progreso" project="Desarrollo Web" priority="Baja" dueDate="14 nov"
                        assignee="Juan Pérez" />
                    <TaskItem title="Optimizar rendimiento" subtitle="Mejorar tiempos de carga de la aplicación"
                        status="Por Hacer" />
                    <TaskItem title="Campaña Redes Sociales" subtitle="Lanzar nueva campaña en Instagram y Facebook"
                        status="Completada" />
                    <TaskItem title="Campaña Redes Sociales" subtitle="Lanzar nueva campaña en Instagram y Facebook"
                        status="Completada" />
                </SectionCard>

                <SectionCard title="Proyectos Activos">
                    <ProjectItem name="Desarrollo Web" progress="0/4" />
                    <ProjectItem name="Marketing Digital" progress="0/1" />
                    <ProjectItem name="Diseño UX/UI" progress="1/1" />
                </SectionCard>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import SectionCard from '@/components/dashboard/SectionCard.vue'
import TaskItem from '@/components/dashboard/TaskItem.vue'
import ProjectItem from '@/components/dashboard/ProjectItem.vue'
</script>
