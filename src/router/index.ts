import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import PublicLayout from '../layouts/PublicLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: () => import('../views/HomeView.vue') },
        { path: 'imoveis', name: 'properties', component: () => import('../views/PropertiesView.vue') },
        { path: 'imoveis/:id', name: 'property-details', component: () => import('../views/PropertyDetailsView.vue') },
        { path: 'login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { guestOnly: true } },
        { path: 'cadastro', name: 'register', component: () => import('../views/RegisterView.vue'), meta: { guestOnly: true } },
        { path: 'recuperar-senha', name: 'forgot-password', component: () => import('../views/ForgotPasswordView.vue') },
        { path: 'nova-senha', name: 'reset-password', component: () => import('../views/ResetPasswordView.vue') },
        { path: 'confirmar-conta', name: 'confirm-account', component: () => import('../views/ConfirmAccountView.vue') },
        { path: 'perfil', name: 'profile', component: () => import('../views/ProfileView.vue'), meta: { requiresAuth: true } },
        { path: 'meus-anuncios', name: 'my-dwellings', component: () => import('../views/MyDwellingsView.vue'), meta: { requiresAuth: true } },
        { path: 'anuncios/novo', name: 'new-dwelling', component: () => import('../views/DwellingFormView.vue'), meta: { requiresAuth: true, requiresConfirmed: true } },
        { path: 'anuncios/:id/editar', name: 'edit-dwelling', component: () => import('../views/DwellingFormView.vue'), meta: { requiresAuth: true } },
        { path: 'admin', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboardView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
        { path: 'admin/usuarios', name: 'admin-users', component: () => import('../views/admin/AdminUsersView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
        { path: 'admin/imoveis', name: 'admin-dwellings', component: () => import('../views/admin/AdminDwellingsView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  auth.restore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'login', query: { redirect: to.fullPath } }
  if (to.meta.guestOnly && auth.isAuthenticated) return { name: 'home' }
  if (to.meta.requiresAdmin && !auth.isAdmin) return { name: 'home' }
  if (to.meta.requiresConfirmed && !auth.isConfirmed) return { name: 'profile', query: { confirmar: '1' } }
  return true
})

export default router
