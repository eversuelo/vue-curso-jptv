import { defineStore } from "pinia";
import { onMounted, reactive } from "vue";
import { ref } from "vue";
import APIService from "../services/APIService";
import { useModalStore } from "./modal";
import { computed } from "vue";
export const useBebidasStore = defineStore('bebidas', () => {
    const modal = useModalStore();
    const categorias = ref([]);
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    });
    const recetas = ref([]);
    const receta = ref({});
    onMounted(async () => {
        const { data: { drinks } } = await APIService.obtenerCategorias();
        categorias.value = drinks;
    });
    async function obtenerRecetas() {
        const { data: { drinks } } = await APIService.buscarRecetas(busqueda);
        recetas.value = drinks;
    }
    async function obtenerReceta(id) {
        const { data: { drinks } } = await APIService.buscarReceta(id);
        receta.value = drinks[0];
        modal.handleClickModal();
    }
    const noRecetas= computed(()=>recetas.value.length===0);
    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas, receta,
        obtenerReceta,noRecetas
    }

});