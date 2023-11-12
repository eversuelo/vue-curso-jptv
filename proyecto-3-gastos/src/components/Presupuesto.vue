<script setup>
import { ref } from 'vue';
import Alerta from './Alerta.vue';
const presupuesto = ref(0);
const error = ref('');
const definirPresupuesto = () => {
    
    if (presupuesto.value<=1 && presupuesto.value=='') {
        console.log(presupuesto.value);
        error.value = 'Presupuesto no valido';
        setTimeout(() => {
            error.value = '';
        }, 3000);
        return;
    }
    emit('definir-presupuesto',presupuesto.value)
}
const emit=defineEmits(['definir-presupuesto'])
</script>

<template>
    <form class="presupuesto" @submit.prevent="definirPresupuesto">
        <Alerta v-if="error">El presupuesto es incorrecto
            {{ error }}
        </Alerta>

        <div class="campo">
            <label for="nuevo-presupuesto">Definir Presupuesto</label>
            <input min="0" type="number" id="nuevo-presupuesto" class="nuevo-presupuesto" v-model="presupuesto"
                placeholder="Añade tu presupuesto" />
        </div>
        <input type="submit" value="Definir Presupuesto" />
    </form>
</template>
<style scoped>
.presupuesto {
    width: 100%;
}

.campo {
    display: grid;
    gap: 2re, ;
}

.presupuesto input[type="number"] {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
}

.presupuesto label {
    font-size: 2.2rem;
    text-align: center;
    color: var(--azul);
}

.presupuesto input[type="submit"] {
    background-color: var(--azul);
    border: none;
    padding: 1rem;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
    color: var(--blanco);
    font-weight: 900;
    width: 100%;
    transition: background-color .3s ease;
}

.presupuesto input[type="submit"]:hover {
    cursor: pointer;
    background-color: #1048A4;


}
</style>