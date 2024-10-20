<script setup>
const props=defineProps({
    cotizacion:Object
}); 
console.log(props.cotizacion);
</script>
<template>
    <div class="contenedor-resultado">
        <h2>Cotización</h2>
        <div class="resultado">
            <img :src="'https://cryptocompare.com/' + props.cotizacion.IMAGEURL" alt="Imagen de la criptomoneda">
            <div>
                <p class="precio">El precio es: <span>{{ props.cotizacion.PRICE }}</span></p>
                <p>Precio más alto del día: <span>{{ props.cotizacion.HIGHDAY }}</span></p>
                <p>Precio más bajo del día: <span>{{ props.cotizacion.LOWDAY }}</span></p>
                <p>Variación últimas 24 horas: <span>{{ props.cotizacion.CHANGEPCT24HOUR }}</span></p>
                <p>Última actualización: <span>{{ props.cotizacion.LASTUPDATE }}</span></p>

            </div>
        </div>
    </div>
</template>