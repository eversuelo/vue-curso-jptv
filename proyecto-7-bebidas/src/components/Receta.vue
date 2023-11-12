<script setup>
import {useBebidasStore} from '../stores/bebidas';
const bebidas=useBebidasStore();

defineProps({
    receta: Object
});
</script>
<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img :src="receta.strDrinkThumb" :alt="'Imagen de'+receta.strDrink" class="transition-transform hover:scale-125 hover:rotate-2">
        </div>
        <div class="p-5">
            <h2 class="text-2xl font-extrabold truncate">{{ receta.strDrink }}</h2>
            <button class="px-4 py-2 mt-4 font-bold text-white uppercase bg-orange-800 rounded-lg hover:bg-orange-900" @click="bebidas.obtenerReceta(receta.idDrink)" >Ver Receta</button>

        </div>
    </div>
</template>



<style lang="scss" scoped></style>