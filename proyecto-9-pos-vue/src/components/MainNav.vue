<script setup>
import Link from './Link.vue';
import Logo from './Logo.vue';
</script>
<template>
    <header class="absolute top-0 z-10 flex items-center justify-between w-full px-10 py-2 bg-gray-700">
        <div>
            <Logo />
        </div>
        <nav>
            <Link to="admin">Administrar</Link>

        </nav>
    </header>
</template>