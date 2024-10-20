<script setup>
import Link from './Link.vue';
</script>
<template>
    <header class="absolute top-0 z-10 flex items-center justify-between w-full px-10 py-2 bg-gray-700">
        <div>
            <h1 class="text-3xl font-black text-white">
                POS<span class="text-green-400">Vue.js</span>
            </h1>
        </div>
        <nav>
            <Link to="shop">Ir a Tienda</Link>
        </nav>
    </header>
</template>