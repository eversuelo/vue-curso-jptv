<script setup>
import { ref, watch, onMounted } from 'vue';
import Guitarra from './components/Guitarra.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { db } from './data/guitarras'
const guitarras = ref([]);
const carrito = ref([]);
const guitarra = ref({});
onMounted(() => {
    guitarras.value = db
    guitarra.value = db[3]
    const carritoStorage=localStorage.getItem('carrito');
    if(carritoStorage){
        carrito.value=JSON.parse(carritoStorage);
    }
});

const guardarLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito.value));
}
const agregarCarrito = (guitarra) => {
    const existe = carrito.value.some(item => item.id === guitarra.id);
    if (existe) {
        const guitarras = carrito.value.map(item => {
            if (item.id === guitarra.id) {
                item.cantidad++;
                return item;
            } else {
                return item;
            }
        })
        carrito.value = [...guitarras];
    } else {
        guitarra.cantidad = 1;
        carrito.value = [...carrito.value, guitarra];
    }

}
const decrementarCantidad = (guitarra) => {
    const guitarras = carrito.value.map(item => {
        if (item.id === guitarra.id) {
            if (item.cantidad === 1) {
                item.cantidad = 1;
                return item;
            } else {
                item.cantidad--;
                return item;
            }
        } else {
            return item;
        }
    })
    carrito.value = [...guitarras];
}
const eliminarGuitarra = (guitarra) => {
    const guitarras = carrito.value.filter(item => item.id !== guitarra.id);
    carrito.value = [...guitarras];
}
const incrementarCantidad = (guitarra) => {
    const guitarras = carrito.value.map(item => {
        if (item.id === guitarra.id) {
            item.cantidad++;
            return item;
        } else {
            return item;
        }
    })
    carrito.value = [...guitarras];
}
const vaciarCarrito = () => {
    carrito.value = [];
}
//Watchers
watch(carrito, guardarLocalStorage, { deep: true });
</script>

<template>
    <Header @vaciar-carrito="vaciarCarrito" :guitarra="guitarra" :carrito="carrito" @incrementar-cantidad="incrementarCantidad" @agregar-carrito="agregarCarrito" @decrementar-cantidad="decrementarCantidad" @eliminar-guitarra="eliminarGuitarra" />

    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>

        <div class="row mt-5">
            <Guitarra @agregar-carrito="agregarCarrito" v-for="guitarra in guitarras" v-bind:guitarra="guitarra" />
        </div>
    </main>

    <Footer />
</template>
<style scoped></style>