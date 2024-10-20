
<script setup>
import { RouterLink } from 'vue-router';
defineProps({
    to: String
});

</script>

<template>
    <RouterLink class="px-3 py-2 text-white bg-green-400 rounded hover:bg-green-500" :to="{ name: to }">
        <slot></slot>
    </RouterLink>
</template>

<style lang="scss" scoped></style>