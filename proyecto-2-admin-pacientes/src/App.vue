<script setup>
import { ref, reactive, watch , onMounted} from 'vue';
import { uid } from 'uid';
import Header from './components/Header.vue'
import Formulario from './components/Formulario.vue';
import Paciente from './components/Paciente.vue';
const pacientes = ref([]);
const paciente = reactive({
  id: null,
  nombre: '',
  propietario: '',
  alta: '',
  email: '',
  sintomas: ''
});
onMounted(() => {
  obtenerLocalStorage();
});
const guardarPaciente = () => {
  if (paciente.id) {
    const { id } = paciente
    const i = pacientes.value.findIndex(
      (pacienteState) => pacienteState.id === id
    )
    pacientes.value[i] = { ...paciente }
  } else {
    pacientes.value.push({
      ...paciente,
      id: uid()
    })
  }
  Object.assign(paciente, {
    nombre: '',
    propietario: '',
    email: '',
    alta: '',
    sintomas: '',
    id: null
  })
}
const actualizarPaciente = (id) => {
  const pacienteEditar = pacientes.value.filter(paciente => paciente.id === id)[0];
  Object.assign(paciente, { ...pacienteEditar });
}
const eliminarPaciente = (id) => {
  pacientes.value = pacientes.value.filter((paciente) => paciente.id !== id)
}
const guardarLocalStorage = () => {
  localStorage.setItem('pacientes', JSON.stringify(pacientes.value));
}
const obtenerLocalStorage = () => {
  const pacientesLS = localStorage.getItem('pacientes');
  if (pacientesLS) {
    pacientes.value = JSON.parse(pacientesLS);
  }
}
watch(pacientes, () => {
  guardarLocalStorage();

}
  , { deep: true });
</script>

<template>
  <div class="container mx-auto mt-20">
    <Header />
    <div class="mt-12 md:flex">
      <Formulario :id="paciente.id" v-model:nombre="paciente.nombre" v-model:propietario="paciente.propietario"
        v-model:alta="paciente.alta" v-model:email="paciente.email" v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPaciente" />
      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">Administra tus Pacientes</h3>
        <div v-if="pacientes.length">
          <Paciente v-for="paciente in pacientes" :paciente="paciente" @actualizar-paciente="actualizarPaciente"
            @eliminar-paciente="eliminarPaciente" />
        </div>
        <p v-else class="mt-20 text-2xl text-center">No hay Pacientes</p>
      </div>
    </div>
  </div>
</template>


