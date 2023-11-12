<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
defineProps({
    to: {
        type: String,
        required: true
    }
});
</script>
<template>
    <RouterLink :to="{ name: to }" class="block px-3 py-2 text-sm font-bold text-white uppercase bg-blue-600 rounded shadow md:inline-block hover:bg-blue-500">
        <slot></slot>
    </RouterLink>
</template>