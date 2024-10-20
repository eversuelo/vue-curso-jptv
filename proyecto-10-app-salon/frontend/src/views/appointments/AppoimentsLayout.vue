
<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-black text-white lg:text-6xl"> App Salón</h1>
        <div class="flex flex-col space-y-5">
            <div class="flex items-center gap-2">
                <p class="text-right text-white">Hola: Usuario</p>
                <button type="button" class="px-3 py-1 font-extrabold text-white bg-red-600 rounded-md hover:bg-red-700">Cerrar Sesión</button>
            </div>
            <nav class="flex items-center justify-end gap-2">
                <button class="p-3 text-sm font-black text-gray-200 uppercase rounded-lg">Mis Citas</button>
                <RouterLink :to="{ name: 'new-appointment' }" class="p-3 text-sm font-black text-gray-200 uppercase bg-blue-700 rounded-lg">Nueva Cita</RouterLink>
            </nav>
        </div>
    </div>
    <main>
        <RouterView/>
    </main>
</template>

