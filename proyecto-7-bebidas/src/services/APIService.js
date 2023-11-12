import api from "../lib/axios";

export default {
    obtenerCategorias: async () => {
       return api('/list.php?c=list');  
    },
    buscarRecetas: async (busqueda) => {
        return api(`/filter.php?c=${busqueda.categoria}&i=${busqueda.nombre}`);
    },
    buscarReceta: async (id) => {
        return api(`/lookup.php?i=${id}`);
    }
}