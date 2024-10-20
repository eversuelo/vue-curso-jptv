import { createRouter, createWebHistory } from 'vue-router'
import ClientesView from '../views/ClientesView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClientesView,
      props: {title:'Lista de Clientes'}
    }, {
      path: '/agregar-cliente',
      name: 'agregar-cliente',
      component:()=> import('../views/NuevoClienteView.vue'),
      props: {title:'Agregar Cliente'}
    },

  ]
})

export default router
