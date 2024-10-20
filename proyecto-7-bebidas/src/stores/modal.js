import { defineStore } from "pinia";
import { ref ,computed} from "vue";
import {useFavoritosStore} from './favoritos';
import {useBebidasStore} from './bebidas';
export const useModalStore = defineStore('modal',()=>{
    const favoritos=useFavoritosStore();
    const bebidas=useBebidasStore();

    const modal = ref(false);
    const handleClickModal = () => {
        modal.value = !modal.value;
    }

    const textoBoton=computed(()=>{
        return favoritos.existeFavorito(bebidas.receta.idDrink)?'Eliminar de favoritos':'Agregar a favoritos';
    })
    return {
        modal,
        handleClickModal,
        textoBoton
    }
});