import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useFirebaseAuth } from 'vuefire';
import { onAuthStateChanged } from 'firebase/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          meta: { requiresAuth: true },
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: '/admin/nueva-propiedad',
          name: 'admin-nueva-propiedad',
          meta: { requiresAuth: true },
          component: () => import('../views/admin/NuevaPropiedadView.vue'),
        },

        {
          path: '/admin/editar-propiedad/:id',
          name: 'admin-editar-propiedad',
          meta: { requiresAuth: true },
          component: () => import('../views/admin/EditarPropiedadView.vue'),
        }
      ],
    }
  ]
})
// Guard para proteger rutas
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

// Función para autenticar usuario
function authenticateUser() {
  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        reject()
      }
    })
  })
}
export default router
