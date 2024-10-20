<script setup>

import Receta from '../components/Receta.vue';
import { useBebidasStore } from '../stores/bebidas';
const bebidas = useBebidasStore();
</script>
<template>
    <h1 class="text-6xl font-extrabold">Recetas</h1>
    <p v-if="bebidas.noRecetas" class="m-10 text-6xl ">No Hay Recetas, Busca algunas recetas.</p>
    <div v-else class="grid grid-cols-1 gap-10 my-10 md:grid-cols-2 2xl:grid-cols-3">
        <Receta v-for="receta in bebidas.recetas" :key="receta.idDrink" :receta="receta"/>
    </div>
</template>