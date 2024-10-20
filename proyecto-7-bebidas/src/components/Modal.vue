<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalStore } from '../stores/modal';
import { useBebidasStore } from '../stores/bebidas';
import { useFavoritosStore } from '../stores/favoritos';
const modal = useModalStore();
const bebidas = useBebidasStore();
const favoritos=useFavoritosStore();
const formatearIngredientes=()=>{
  let ingredientes=[];
  for(let i=1;i<16;i++){
    if(bebidas.receta['strIngredient'+i]){
      ingredientes.push({
        ingrediente:bebidas.receta['strIngredient'+i],
        cantidad:bebidas.receta['strMeasure'+i]
      });
    }
  }
  return ingredientes;
}
</script>

<template>
  <TransitionRoot as="template" :show="modal.modal">
    <Dialog as="div" class="relative z-10" @close="modal.handleClickModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div>
                <div class="mt-3">
                  <DialogTitle class="text-lg font-medium leading-6 text-gray-900">
                    <h3 class="text-2xl font-extrabold text-center">Receta {{ bebidas.receta.strDrink }}</h3>
                  </DialogTitle>
                  <div class="mt-2">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div class="col-span-2">
                        <img :src="bebidas.receta.strDrinkThumb" :alt="'Imagen de ' + bebidas.receta.strDrink"
                          class="w-full h-96">
                      </div>
                      <div class="col-span-2">
                        <h4 class="text-xl font-bold">Instrucciones</h4>
                        <p class="mt-2 text-gray-500">{{ bebidas.receta.strInstructions }}</p>
                      </div>
                      <div class="col-span-2">
                        <h4 class="text-xl font-bold">Ingredientes y cantidades</h4>
                        <ul class="mt-2 text-gray-500">
                          <li v-for="ingrediente in formatearIngredientes()" :key="ingrediente.ingrediente" >
                            <p class="font-black ">{{ ingrediente.ingrediente }} - <span class="font-normal" >{{ ingrediente.cantidad }}</span></p>
                          </li>
                          

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between gap-4 mt-5 sm:mt-6">
                  <button type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-800 border border-transparent rounded-md shadow-sm hover:bg-orange-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                    @click="modal.handleClickModal">
                    Cerrar
                  </button>
                  <button type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                    @click="favoritos.handleClickFavorito(bebidas.receta);modal.handleClickModal" >
                    {{ modal.textoBoton }}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>