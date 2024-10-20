<script setup>
import axios from 'axios';
import { onMounted ,ref} from 'vue';
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
defineProps({
    title: {
        type: String,
        required: true
    },
});
const clientes = ref([]);
onMounted(async () => {
    axios.get('http://localhost:4000/clientes')
        .then(({data}) => clientes.value = data)
        .catch((error) => {
            alert('Ocurrio un error al cargar los clientes');
            console.log(error);
        });
});
</script>
<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="agregar-cliente">Agregar Cliente</RouterLink>
        </div>
        <Heading>{{title}}</Heading>
        <div>

        </div>
    </div>
</template>