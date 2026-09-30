import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Clientes from '../views/Clientes.vue'
import Servicos from '../views/Servicos.vue'
import Agendamentos from '../views/Agendamentos.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/servicos',
    name: 'Servicos',
    component: Servicos
  },
  {
    path: '/agendamentos',
    name: 'Agendamentos',
    component: Agendamentos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router