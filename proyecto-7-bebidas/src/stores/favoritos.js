import { ref,watch, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useBebidasStore } from './bebidas';
import { useNotificacionesStore } from './notificaciones';
import { useModalStore } from './modal';
export const useFavoritosStore = defineStore('favoritos', () => {
    const favoritos = ref([]);
    const modal = useModalStore();
    const bebidas = useBebidasStore();
    const notificaciones = useNotificacionesStore();
    const handleClickFavorito = (receta) => {
        if (favoritos.value.some(favorito => favorito.idDrink === receta.idDrink)) {
            eliminarFavorito(bebidas.receta.idDrink);
        } else {
            agregarFavorito();
        }
        modal.modal = false;
    }
    const eliminarFavorito = (id) => {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== id);
        notificaciones.texto = 'Se ha eliminado de tus favoritos';
        notificaciones.error = false;
        notificaciones.mostrar = true;
        setTimeout(() => {
            notificaciones.$reset();
        }, 3000);
    }
    function existeFavorito(id) {
        const favoritoLS = JSON.parse(localStorage.getItem('favoritos')) || [];
        return favoritoLS.some(favorito => favorito.idDrink === id);
    }

    watch(favoritos, (nuevoValor) => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));

    }, { deep: true });
    onMounted(() => {
        const favoritosLS = localStorage.getItem('favoritos');
        if (favoritosLS) {
            favoritos.value = JSON.parse(favoritosLS);
        }
    });
    function agregarFavorito(){
        favoritos.value.push(bebidas.receta);
        notificaciones.texto = 'Se ha agregado a tus favoritos';
        notificaciones.error = false;
        notificaciones.mostrar = true;
        setTimeout(() => {
            notificaciones.$reset();
        }, 3000);
    
    }
    return {
        favoritos,
        handleClickFavorito,
        eliminarFavorito,
        existeFavorito,
        
    }
}
);