<script setup>
import { collection, addDoc } from 'firebase/firestore';
import { useForm, useField } from 'vee-validate';
import { useFirestore } from "vuefire";
import { useRouter } from 'vue-router';
//LMap
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue';
import useImage from '../../composables/useImage';
import { validationSchema, imageSchema } from "../../validation/propiedadSchema";
const router = useRouter();
const { handleSubmit } = useForm({ validationSchema: { ...validationSchema, ...imageSchema } });
//No olvidar cambiar las reglas en cloud firestore
const items = ['1', '2', '3', '4', '5'];
const zoom = ref(13);
const titulo = useField('titulo');
const imagen = useField('imagen');
const precio = useField('precio');
const estacionamiento = useField('estacionamiento');
const wc = useField('wc');
const habitaciones = useField('habitaciones');
const descripcion = useField('descripcion');
const alberca = useField("alberca", null, { initialValue: false });
const db = useFirestore();
const { uploadImage, image, url } = useImage();
const submit = handleSubmit(async (values) => {
    const { imagen, ...propiedad } = values;
    console.log(propiedad);
    const docRef = await addDoc(collection(db, "propiedades"), {
        ...propiedad,
        imagen: url.value
    });
    if (docRef.id) {
        router.push({ name: "admin" });
        console.log("Document written with ID: ", docRef.id);
    }

});
</script>
<template>
    <h2 class="text-center text-h3 my-5 font-weight-bold">Nueva Propiedad</h2>
    <v-card max-width="800" flat class="mx-auto">
        <v-card-title class="text-center text-h4 font-weight-bold" tag="h3">
            Nueva Propiedad
        </v-card-title>
        <v-card-subtitle class="py-5 text-center text-h5 text-wrap">
            Crea una nueva propiedad llenando el siguiente formulario
        </v-card-subtitle>
        <v-form class="mt-10">
            <v-text-field label="Titulo" type="text" bg-color="blue-grey-lighten-5" class="mb-5"
                v-model="titulo.value.value" :error-messages="titulo.errorMessage.value" />
            <v-file-input @change="uploadImage" label="Fotografia" prepend-icon="mdi-camera" type="file"
                bg-color="blue-grey-lighten-5" class="mb-5" v-model="imagen.value.value"
                :error-messages="imagen.errorMessage.value" />

            <div class="my-5" v-if="image">
                <p class="font-weight-bold">Imagen Propiedad:</p>
                <img :src="image" alt="Imagen Casa" class="w-50">
            </div>
            <v-text-field label="Precio" v-model="precio.value.value" bg-color="blue-grey-lighten-5" class="mb-5"
                :error-messages="precio.errorMessage.value" />
            <v-row>
                <v-col cols="12" md="4">
                    <v-select label="Habitaciones" :items="items" v-model="habitaciones.value.value"
                        :error-messages="habitaciones.errorMessage.value" />
                </v-col>
                <v-col cols="12" md="4">
                    <v-select label="Estacionamientos" :items="items" v-model="estacionamiento.value.value"
                        :error-messages="estacionamiento.errorMessage.value" />
                </v-col>
                <v-col cols="12" md="4">
                    <v-select label="Baños" :items="items" v-model="wc.value.value"
                        :error-messages="wc.errorMessage.value" />
                </v-col>
            </v-row>
            <v-textarea class="mb-5" label="Descripcion" v-model="descripcion.value.value" bg-color="blue-grey-lighten-5"
                :error-messages="descripcion.errorMessage.value" rows="5" />
            <v-checkbox label="Piscina" v-model="alberca.value.value" :error-messages="alberca.errorMessage.value" />
            <h2 class="font-weight-bold text-center my-5">Ubicación:</h2>
            <div class="pb-10">
                <div class="mt-3" style="height:600px;">
                    <LMap  v-model:zoom="zoom" 
                    :center="[47.41322, -1.219482]" :use-global-leaflet="false">
                        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" ></LTileLayer>
                    </LMap>
                </div>
            </div>
            <v-btn color="primary" @click="submit" block class="mt-5">
                Crear Propiedad
            </v-btn>
        </v-form>


    </v-card>
</template>