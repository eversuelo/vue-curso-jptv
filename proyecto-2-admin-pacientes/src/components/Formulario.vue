<script setup>
import { reactive, computed } from 'vue'
import Alerta from './Alerta.vue';
const alerta = reactive({
    tipo: '',
    mensaje: ''
});
const emit = defineEmits(['guardar-paciente', 'update:nombre', 'update:propietario', 'update:alta', 'update:email', 'update:sintomas']);
const props = defineProps({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    alta: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sintomas: {
        type: String,
        required: true
    },
    id: {
        type: [String, null],
        required: true
    }

});

const validarFormulario = () => {
    if (Object.values(props).includes('')) {
        alerta.mensaje = 'Todos los campos son obligatorios';
        alerta.tipo = 'error';
        return;
    } else {
        alerta.mensaje = 'Paciente agregado correctamente';
        alerta.tipo = 'success';
        emit('guardar-paciente');
        setTimeout(() => {
            Object.assign(alerta, { mensaje: '', tipo: '' });
        }, 3000);
        return;
    }

}
const editando = computed(() => props.id !== null);
</script>
<template>
    <div class="md:w-1/2">
        <h2 class="font-black text-3xl text-center mb-10">Seguimiento Pacientes</h2>
        <p class="text-lg m-5 text-center ">Añade Pacientes y <span class="text-indigo-600 font-bold">Adminitralos</span>
        </p>
        <Alerta v-if="alerta.mensaje" :alerta="alerta" />
        <form @submit.prevent="validarFormulario" action="" class="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
            <div class="mb-5">
                <label for="mascota" class="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                <input :value="nombre" type="text" id="mascota" placeholder="Nombre de la Mascota"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    @input="$emit('update:nombre', $event.target.value)">
            </div>
            <div class="mb-5">
                <label for="propietario" class="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                <input :value="propietario" @input="$emit('update:propietario', $event.target.value)" type="text"
                    id="propietario" placeholder="Nombre de la Propietario"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">
            </div>
            <div class="mb-5">
                <label for="alta" class="block text-gray-700 uppercase font-bold">Fecha Alta</label>
                <input :value="alta" type="date" @input="$emit('update:alta', $event.target.value)" name="alta" id="alta">
            </div>
            <div class="mb-5">
                <label for="email" class="block text-gray-700 uppercase font-bold">Correo</label>
                <input :value="email" type="email" @input="$emit('update:email', $event.target.value)" id="email"
                    placeholder="Correo" class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">
            </div>
            <div class="mb-5">
                <label for="sintomas" class="block text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea :value="sintomas" @input="$emit('update:sintomas', $event.target.value)" name="sintomas"
                    id="sintomas" class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md h-40"
                    placeholder="Describe los sintomas"></textarea>
            </div>
            <input type="submit" :value="editando ? 'Editar Paciente' : 'Agregar Paciente'"
                class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors">
        </form>
    </div>
</template>