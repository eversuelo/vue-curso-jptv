<script setup>
import cerrarModal from '../assets/img/cerrar.svg'
import { ref } from 'vue';
import Alerta from './Alerta.vue';
const emit = defineEmits(['ocultar-modal','update:nombre','update:cantidad','update:categoria','guardar-gasto','eliminar-gasto']);
const error=ref('');
const props = defineProps({
    modal: {
        type: Object,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: [Number, String],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    disponible: {
        type: Number,
        required: true
    },
    id: {
        type: [Number, String],
        required: false
    }
});
const old=props.cantidad;
const agregarGasto=()=>{
   //Validar que no haya campos vacios
   const {nombre,cantidad,categoria,id}=props;
   if([nombre,cantidad,categoria].includes('')){
       error.value='Todos los campos son obligatorios';
       setTimeout(() => {
           error.value='';
       }, 3000);
       return;
   }
   if(cantidad<=0 || isNaN(cantidad)){
       error.value='Cantidad no valida';
       setTimeout(() => {
           error.value='';
       }, 3000);
       return;
   }
   if(id){
        if(cantidad>props.disponible+old){
            error.value='Cantidad mayor al disponible';
            setTimeout(() => {
                error.value='';
            }, 3000);
            return;
        }
   }
   if(cantidad>props.disponible){
       error.value='Cantidad mayor al disponible';
       setTimeout(() => {
           error.value='';
       }, 3000);
       return;
   }
   emit('guardar-gasto')
}

</script>
<template>
    <div class="modal" :class="[modal.animar?'animar':'cerrar']">
        <div class="cerrar-modal"> <img :src="cerrarModal" @click="emit('ocultar-modal')" alt="Cerrar Modal"></div>
        <div class="contenedor contenedor-formulario" :class="[modal.animar?'animar':'cerrar']">
            <form class="nuevo-gasto" @submit.prevent="agregarGasto">
                <legend>{{id?'Editar Gasto':'Añadir Gasto'}}</legend>
                <Alerta v-if="error">{{error}}</Alerta>
                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                        <input type="text" placeholder="Añade el nombre del gasto" id="nombre"
                        :value="nombre"
                        @input="$emit('update:nombre',$event.target.value)"
                    >
                </div>
                <div class="campo">
                    <label for="cantidad">Cantidad del Gasto:</label>
                    <input type="number" placeholder="Añade la cantidad del gasto" id="cantidad"
                    :value="cantidad"
                    @input="$emit('update:cantidad',+$event.target.value)"
                    >
                </div>
                <div class="campo">
                    <label for="categoria">Categoria del Gasto:</label>
                    <select id="categoria" :value="categoria"  @input="$emit('update:categoria',$event.target.value)">
                        <option value="" disabled selected>-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <div class="campo enviar">
                    <input type="submit" :value="[id?'Guardar Cambios':'Añadir Gastos']" class="boton">
                </div>
            </form>
            <button v-if="id" @click="emit('eliminar-gasto')" type="button" class="btn-eliminar">Eliminar Gasto</button>
        </div>
    </div>
</template>
<style scoped>
.btn-eliminar{
    padding: 1rem;
    background-color: #ef4444;
    width: 100%;
    font-weight: 700;
    font-size: 700;
    font-size: 1.2rem;
    color: var(--blanco);
    margin-top: 10rem;
    cursor: pointer;
    border: none;
}
.modal {
    position: absolute;
    background-color: rgb(0 0 0 / 9);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: all .3s ease;
}

.cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;

}

.cerrar-modal img {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
}

.contenedor-formulario {
    margin: 10rem auto 0 auto;
    opacity: 0;
    transition: all .3s ease;
  
}
.animar{
    opacity: 1;
}
.cerrar{
    opacity: 0;
}
.nuevo-gasto {
    margin: 10rem auto 0 auto;
    background-color: var(--gris);
    border-radius: 1rem;
    padding: 3rem;
}

.nuevo-gasto legend {
    font-size: 2.4rem;
    text-align: center;
    font-weight: 900;
    color: var(--azul);
}

.nuevo-gasto .campo {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
}

.nuevo-gasto .campo label {
    font-size: 2.2rem;
    text-align: center;
    color: var(--blanco);
}

.nuevo-gasto .campo input[type="text"],
.nuevo-gasto .campo input[type="number"] {
    background-color: var(--blanco);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
}

.nuevo-gasto .campo select {
    background-color: var(--blanco);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
    width: 100%;
}

.nuevo-gasto .campo .boton {
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

.nuevo-gasto .campo .boton:hover {
    cursor: pointer;
    background-color: #1048A4;
}</style>