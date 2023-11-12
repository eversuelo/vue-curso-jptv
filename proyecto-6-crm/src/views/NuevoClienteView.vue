<script setup>
import {reactive} from 'vue';
import Heading from '../components/UI/Heading.vue';
import RouterLink from '../components/UI/RouterLink.vue';
import { FormKit } from '@formkit/vue';
defineProps({
    title: {
        type: String,
        required: true
    },
});
const formData=reactive({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    puesto: '',

});
const handleSubmit = (data) => {
    console.log(data);
}
</script>
<template>
    <div class="bg-gray-200">
        <div class="flex justify-end">
            <RouterLink to="home">Volver</RouterLink>
        </div>
        <Heading>{{ title }}</Heading>
        <div class="mx-auto mt-10 bg-white rounded-lg shadow">
            <div class="px-2 py-10 mx-auto md:w-2/3">
                <FormKit submit-label="Agregar Cliente" type="form" class="w-full" @submit="handleSubmit">
                    <FormKit name="nombre" type="text" label="Nombre" placeholder="Nombre de Cliente"
                        help="Coloca el nombre del cliente que deseas registrar" validation="required"
                        :validation-messages="{ required: 'El nombre del cliente es obligatorio' }" />
                    <FormKit name="apellido" type="text" label="Apellido" placeholder="Apellido de Cliente"
                        help="Coloca el Apellido del cliente que deseas registrar" validation="required"
                        :validation-messages="{ required: 'El Apellido del cliente es obligatorio' }" />
                    <FormKit name="email" type="email" label="Email" placeholder="Email de Cliente"
                        help="Coloca el Email del cliente que deseas registrar" validation="required|email"
                        :validation-messages="{ required: 'El Email del cliente es obligatorio', email: 'Coloca un email valido' }" />
                    <FormKit name="telefono" type="text" label="Telefono" placeholder="Telefono XXX-XXX-XXXX"
                        help="Coloca el Telefono del cliente que deseas registrar"
                        validation="?*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{ required: 'El Telefono del cliente es obligatorio', matches: 'El formato no es válido' }" />
                    <FormKit name="empresa" type="text" label="Empresa" placeholder="Empresa de Cliente"
                        help="Coloca el Empresa del cliente que deseas registrar" />
                    <FormKit name="puesto" type="text" label="Puesto" placeholder="Puesto de Cliente"
                        help="Coloca el Puesto del cliente que deseas registrar" />
                </FormKit>
            </div>
        </div>
    </div>
</template>
<style>
.formkit-wrapper {
    max-width: 100%;
}
</style>