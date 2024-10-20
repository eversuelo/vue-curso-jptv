<script setup>
import imagen from '../assets/img/grafico.jpg'
import CircleProgress from 'vue3-circle-progress';
import "vue3-circle-progress/dist/circle-progress.css";
import { formatearCantidad } from '../helpers';
import { computed } from 'vue';
const props =defineProps({
    presupuesto:{
        type:Number,
        required:true
    },
    disponible:{
        type:Number,
        required:true
    },
    gastado:{
        type:Number,
        required:true
    }
});
const emit = defineEmits(['reset-app']);
const porcentaje=computed(()=>{
    return parseInt((props.gastado/props.presupuesto)*100);
})
</script>

<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <CircleProgress :show-percent="true" :percent="porcentaje" :size="180" :border-width="20" :border-bg-width="20" fill-color="#3b82f6" empty-color="#94a3b8"/>
        </div>
        <div class="contenedor-presupuesto">
            <button class="reset-app" type="button" @click="emit('reset-app')">
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span>{{ formatearCantidad(presupuesto) }}
            </p>
            <p>
                <span>Disponible:</span> {{ formatearCantidad(disponible)  }}
            </p>
            <p>
                <span>Gastado:</span> {{ formatearCantidad(gastado)  }}
            </p>
        </div>
    </div>
</template>
<style scoped>
.contenedor-grafico{
    position:relative;
    margin: auto;
    top: calc(50% - 1.5rempx);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 100;
    font-size:3rem;
    font-weight: 900;
}
.dos-columnas {
    display: flex;
    flex-direction: column;
}
.dos-columnas:first-child{
    margin-bottom: 3rem;
}

@media screen and (min-width: 768px) {
    .dos-columnas {
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }
    .dos-columnas >:first-child{
        margin-bottom: 0;
    }
}
.contenedor-presupuesto{
    width: 100%;
}
.contenedor-presupuesto p{
    font-size: 2.4rem;
    text-align: center;
    color: var(--gris-oscuro);
}
@media (min-width: 768px){
    .contenedor-presupuesto p{
        text-align: left;
    }
}
.contenedor-presupuesto span{
    font-weight: bold;
    color: var(--azul);
}
.reset-app{
    background-color: #DB2777;
    border: none;
    padding: 1rem;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
    color: var(--blanco);
    font-weight: 900;
    width: 100%;
    border-radius: 1rem;
    cursor: pointer;
    transition : background-color .3s ease;
}
.reset-app:hover{
    background-color: #BE185D;
}
</style>