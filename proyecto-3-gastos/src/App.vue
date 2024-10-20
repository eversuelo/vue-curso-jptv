<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import Gasto from './components/Gasto.vue';
import iconoNuevoGasto from './assets/img/nuevo-gasto.svg';
import Presupuesto from './components/Presupuesto.vue';
import ControlPresupuesto from './components/ControlPresupuesto.vue';
import Filtros from './components/Filtros.vue';
import { generarId } from './helpers';
import Modal from './components/Modal.vue';
const modal = reactive({
  mostrar: false,
  animar: false
});
const gastos = ref([]);
const gastado = ref(0);
const filtro = ref('');
const presupuesto = ref(0);
const disponible = ref(0);
const gasto = reactive({
  nombre: '',
  cantidad: 0,
  categoria: '',
  id: null,
  fecha: Date.now()
})
watch(gastos, () => {
  const totalGastado = gastos.value.reduce((total, gasto) => total + gasto.cantidad, 0);
  gastado.value = totalGastado;
  disponible.value = presupuesto.value - totalGastado;
  localStorage.setItem('gastos', JSON.stringify(gastos.value));
}, { deep: true })
watch(modal, () => {
  if (!modal.mostrar) {
    reiniciarStateGasto();
  }
});
onMounted(() => {
  const presupuestoStorage=localStorage.getItem('presupuesto')
  if (presupuestoStorage) {
    presupuesto.value =Number(presupuestoStorage);
    disponible.value =Number(presupuestoStorage);
  }
  const gastosStorage=localStorage.getItem('gastos')
  if (gastosStorage) {
    gastos.value =JSON.parse(gastosStorage);
  }
})
watch(presupuesto, () => {
  localStorage.setItem('presupuesto', JSON.stringify(presupuesto.value));
})

const definirPresupuesto = (cantidad) => {
  presupuesto.value = cantidad;
  disponible.value = cantidad;
}
const mostrarModal = () => {
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 300);
}
const ocultarModal = () => {
  modal.animar = false;
  setTimeout(() => {
    modal.mostrar = false;
  }, 300);
  reiniciarStateGasto();
}
const guardarGasto = () => {
  if (gasto.id) {
    const gastoEditar = gastos.value.filter(gasto_i => gasto_i.id === gasto.id);
    Object.assign(gastoEditar[0], {...gasto});
    
  } else {
    gastos.value.push({ ...gasto, id: generarId() });
  }
  ocultarModal();
    reiniciarStateGasto();
}
const seleccionarGasto = id => {
  const gastoEditar = gastos.value.filter(gasto => gasto.id === id);
  Object.assign(gasto, gastoEditar[0]);
  mostrarModal();
}
const reiniciarStateGasto = () => {
  Object.assign(gasto, {
    nombre: '',
    cantidad: 0,
    categoria: '',
    id: null,
    fecha: Date.now()
  });
}
const eliminarGasto=()=>{
  gastos.value=gastos.value.filter(gasto_i=>gasto_i.id!==gasto.id);
  ocultarModal();

}
const gastosFiltrados = computed(() => {
  if (filtro.value) {
    return gastos.value.filter(gasto => gasto.categoria === filtro.value);
  }
  return gastos.value;
});
const resetApp=()=>{
 if (confirm('¿Estas seguro de resetear la app?')) {
   gastos.value=[];
   presupuesto.value=0;
   disponible.value=0;
   localStorage.clear();
 }
}
</script>


<template>
  <div :class="{ fijar: modal.mostrar }">
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto v-if="presupuesto === 0" @definir-presupuesto="definirPresupuesto" />
        <ControlPresupuesto @reset-app="resetApp" :gastado="gastado" :disponible="disponible" :presupuesto="presupuesto" v-else />
      </div>

    </header>
    <main v-if="presupuesto > 0">
      <Filtros v-model:filtro="filtro" />
      <div class="contenedor listado-gastos">
        <h2>{{ gastosFiltrados.length ? 'Gastos' : 'No hay gastos' }}</h2>
        <Gasto @seleccionar-gasto="seleccionarGasto" v-for="gasto in gastosFiltrados" :key="gasto.id" :gasto="gasto" />
      </div>

      <div class="crear-gasto">
        <img :src="iconoNuevoGasto" @click="mostrarModal" alt="icono nuevo gasto">
      </div>
      <Modal :id="gasto.id" @eliminar-gasto="eliminarGasto" v-model:nombre="gasto.nombre" :disponible="disponible" @guardar-gasto="guardarGasto"
        v-model:cantidad="gasto.cantidad" v-model:categoria="gasto.categoria" v-if="modal.mostrar" :modal="modal"
        @ocultar-modal="ocultarModal" />
    </main>
  </div>
</template>

<style >
:root {
  --azul: #3b82f6;
  --blanco: #ffffff;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --gris-claro: #f3f4f6;
  --negro: #000000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: 'Lato', sans-serif;
  background-color: var(--gris-claro);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

header {
  background-color: var(--azul);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}

.fijar {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}

.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.crear-gasto img {
  width: 5rem;
  cursor: pointer;
}

.listado-gastos {
  margin-top: 10rem;
}

.listado-gastos h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
}
</style>
