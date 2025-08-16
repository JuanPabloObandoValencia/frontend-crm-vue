<template>
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Crear Usuario</h2>

    <form @submit.prevent="createUser" class="space-y-4">
      <div>
        <label class="block">Email</label>
        <input v-model="form.email" type="email" class="border p-2 w-full rounded" required />
      </div>

      <div>
        <label class="block">Nombre</label>
        <input v-model="form.name" type="text" class="border p-2 w-full rounded" required />
      </div>

      <div>
        <label class="block">Contraseña</label>
        <input v-model="form.password" type="password" class="border p-2 w-full rounded" required minlength="6"/>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>

    <div v-if="message" class="mt-4 p-2 bg-green-100 border border-green-300 rounded">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  email: '',
  name: '',
  password: ''
})

const message = ref<string | null>(null)

const createUser = async () => {
  try {
    const res = await axios.post('/api/users', form.value)
    message.value = `Usuario creado con éxito: ${res.data.email}`
    form.value = { email: '', name: '', password: '' } // limpiar form
  } catch (err: any) {
    console.error(err)
    message.value = 'Error al crear usuario'
  }
}
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>
