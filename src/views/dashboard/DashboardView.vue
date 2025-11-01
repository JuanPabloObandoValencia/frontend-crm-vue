<template>
    <MainLayout>
        <div class="p-6 min-h-screen">
            <h1 class="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
            <p class="text-gray-600 mb-6">
                Bienvenido de vuelta. Aquí está el resumen de tus tareas.
            </p>

            <!-- Tarjetas superiores -->
            <div class="grid grid-cols-4 gap-4 mb-6">
                <StatsCard title="Total de Tareas" :value="tasksCount.total" icon="ri-list-check-line" />
                <StatsCard title="Por Hacer" :value="tasksCount.todo" icon="ri-time-line" color="orange" />
                <StatsCard title="En Progreso" :value="tasksCount.inProgress" icon="ri-loader-2-line" color="purple" />
                <StatsCard title="Completadas" :value="tasksCount.done" icon="ri-checkbox-circle-line" color="green" />
            </div>

            <!-- Contenido principal -->
            <div class="grid grid-cols-3 gap-4">
                <SectionCard title="Tareas Recientes" class="col-span-2">
                    <TaskItem v-for="task in tasks" :key="task.id" :title="task.title" :subtitle="task.description"
                        :status="task.status" :project="task.project.name" :priority="task.priority"
                        :dueDate="task.due_date"
                        :assignee="task.assignee?.first_name + ' ' + task.assignee?.first_last_name" />

                </SectionCard>

                <SectionCard title="Proyectos Activos">
                    <ProjectItem v-for="project in projects" :key="project.id" :name="project.name"
                        :progress="project.progress" :completed="project.completed" :total="project.total" />

                </SectionCard>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "@/plugins/axios";
import MainLayout from "@/layouts/MainLayout.vue";
import StatsCard from "@/components/dashboard/StatsCard.vue";
import SectionCard from "@/components/dashboard/SectionCard.vue";
import TaskItem from "@/components/dashboard/TaskItem.vue";
import ProjectItem from "@/components/dashboard/ProjectItem.vue";

interface Task {
    id: number;
    title: string;
    description?: string;
    status: { name: string };
    priority: { name: string };
    project: { name: string };
    due_date?: string;
    assignee?: {
        first_name: string;
        first_last_name: string;
    };
}

interface Project {
    id: number;
    name: string;
    description?: string;
    tasks: Task[];

    total?: number;
    completed?: number;
    progress?: number;
}


const projects = ref<Project[]>([]);
const tasks = ref<Task[]>([]);

const tasksCount = ref({
    total: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
});

onMounted(async () => {
    try {
        const [projectsRes, tasksRes] = await Promise.all([
            axios.get<Project[]>("/api/projects"),
            axios.get<Task[]>("/api/tasks"),
        ]);

        projects.value = projectsRes.data.map((project) => {
            const total = project.tasks.length;
            const completed = project.tasks.filter(
                (t) => t.status.name === "Completada"
            ).length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            return { ...project, total, completed, progress };
        });

        tasks.value = tasksRes.data;

        tasksCount.value.total = tasks.value.length;
        tasksCount.value.todo = tasks.value.filter(t => t.status.name === "Por Hacer").length;
        tasksCount.value.inProgress = tasks.value.filter(t => t.status.name === "En Progreso").length;
        tasksCount.value.done = tasks.value.filter(t => t.status.name === "Completada").length;

    } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
    }
});
</script>
