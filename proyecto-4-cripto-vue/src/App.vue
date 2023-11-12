<script setup>
import { ref, reactive } from 'vue';
import Alerta from './components/Alerta.vue';
import Spinner from './components/Spinner.vue';
import useCrypto from './composables/useCrypto';
import Cotizacion from './components/Cotizacion.vue';
const error = ref('');
const cotizar = reactive({
  moneda: '',
  criptoMoneda: ''
});
const { monedas,criptoMonedas,obtenerCotizacion,cargando,cotizacion,mostrarResultado } = useCrypto();
const cotizarCripto = () => {
  //Validar que cotizar tenga datos
  if (Object.values(cotizar).includes('')) {
    error.value = 'Todos los campos son obligatorios';
    setTimeout(() => {
      error.value = '';
    }, 3000);
    return;
  }
  error.value = '';
  obtenerCotizacion(cotizar);
}

</script>
<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">{{ error }}</Alerta>
      <form @submit.prevent="cotizarCripto" action="" class="formulario">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select v-model="cotizar.moneda" name="moneda" id="moneda">
            <option value="" disabled selected>Elige tu moneda</option>
            <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto-moneda">Cripto Moneda:</label>
          <select v-model="cotizar.criptoMoneda" name="cripto-moneda" id="cripto-moneda">
            <option value="" disabled selected>Elige tu moneda</option>
            <option v-for="criptoMoneda in criptoMonedas" :value="criptoMoneda.CoinInfo.Name">{{
              criptoMoneda.CoinInfo.FullName }}</option>
          </select>
        </div>
        <input type="submit" class="boton" value="Cotizar">
      </form>
      <Spinner v-if="cargando == true" />
      <Cotizacion v-if="mostrarResultado" :cotizacion="cotizacion" />

    </div>
  </div>
</template>

<style scoped></style>
