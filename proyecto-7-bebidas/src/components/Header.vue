<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import {useBebidasStore} from '../stores/bebidas';
const route=useRoute();
const store=useBebidasStore();
const paginaInicio=computed(()=>route.name==='inicio');

const handleSubmit=()=>{
    store.obtenerRecetas();
}


</script>
<template>
    <header class="bg-slate-800"
    :class="{'header':paginaInicio}"
    >
        <div class="container px-5 pt-2 pb-6 mx-auto">
            <div class="flex items-center justify-between">
                    <div>
                        <RouterLink :to="{name:'inicio'}">
                            <img class="w-32" src="/img/logo.svg" alt="logotipo">
                        </RouterLink>
                    </div>
                    <nav class="flex gap-4">
                        <RouterLink :to="{name:'inicio'}" active-class="text-orange-500"  class="font-bold text-white uppercase">
                            Inicio 
                        </RouterLink>
                        <RouterLink :to="{name:'favoritos'}" active-class="text-organge-500" class="font-bold text-white uppercase">
                            Favoritos
                        </RouterLink>
                    </nav>
            </div>
            <form @submit.prevent="handleSubmit" v-if="paginaInicio" class="p-12 my-12 space-y-6 bg-orange-400 rounded-lg shadow md:w-1/2 2xl:w-1/3">
                <div class="space-y-4">
                    <label class="block text-lg font-extrabold text-white uppercase" for="ingrediente">Nombre o Ingredientes</label>
                    <input v-model="store.busqueda.nombre" id="ingrediente" class="w-full p-3 rounded-lg focus:outline-none" placeholder="Nombre o Ingredientes: ej. Vodka, Tequila,etc" type="text">
                </div>
                <div class="space-y-4">
                    <label class="block text-lg font-extrabold text-white uppercase" for="ingrcategoriaediente">Categoría</label>
                   <select v-model="store.busqueda.categoria" name="categoria" id="categoria" class="w-full p-3 rounded-lg focus:outline-none">
                        <option value="" hidden>--Seleccione--</option>
                        <option v-for="categoria in store.categorias" :key="categoria.strCategory" :value="categoria.strCategory">
                            {{categoria.strCategory}}
                        </option>
                   </select>    
                </div>
                <input type="submit" value="Buscar Recetas" class="w-full p-2 font-extrabold text-white uppercase bg-orange-800 rounded-lg cursor-pointer hover:bg-orange-900">
            </form>
        </div>
    </header>
</template>
<style>
.header{
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center center;
}
</style>