<template>
  <header class="header">
    <div class="logo">
      Agenda<span>Fácil</span>
    </div>

    <button class="menu-button" @click="menuOpen = !menuOpen">
      ☰
    </button>

    <nav :class="{ open: menuOpen }">
      <router-link to="/" @click="menuOpen = false">
        Dashboard
      </router-link>

      <router-link to="/clientes" @click="menuOpen = false">
        Clientes
      </router-link>

      <router-link to="/servicos" @click="menuOpen = false">
        Serviços
      </router-link>

      <router-link to="/agendamentos" @click="menuOpen = false">
        Agendamentos
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>