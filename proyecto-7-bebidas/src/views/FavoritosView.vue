<script setup>
import Receta from '../components/Receta.vue';
import { useFavoritosStore } from '../stores/favoritos';
const favoritos=useFavoritosStore();
</script>
<template>
    <h1 class="text-6xl font-extrabold">Favoritos</h1>
    <p v-if="favoritos.favoritos.length===0" class="m-10 text-6xl ">No Hay Favoritos</p>
    <div  v-else class="grid grid-cols-1 gap-10 my-10 md:grid-cols-2 2xl:grid-cols-3">
        <Receta v-for="receta in favoritos.favoritos" :key="receta.idDrink" :receta="receta"/>
    </div>
</template>