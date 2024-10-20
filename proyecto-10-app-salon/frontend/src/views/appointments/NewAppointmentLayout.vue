<script setup>
    import { useRoute } from 'vue-router';
    const router=useRoute();
</script>

<template>
    <nav class="flex gap-3 my-5">
        <RouterLink :class="router.name=== 'new-appointment'?'bg-blue-600 text-white' :'bg-white text-blue-600'" :to="{ name: 'new-appointment' }" class="flex-1 p-3 font-extrabold text-center uppercase hover:bg-blue-700 hover:text-white">Servicios</RouterLink>
        <RouterLink :class="router.name=== 'appointment-details'?'bg-blue-600 text-white' :'bg-white text-blue-600'"  :to="{ name: 'appointment-details' }" class="flex-1 p-3 font-extrabold text-center uppercase hover:bg-blue-700 hover:text-white">Cita y Resumen</RouterLink>
        
    </nav>

    <RouterView />
</template>

<style lang="scss" scoped></style>