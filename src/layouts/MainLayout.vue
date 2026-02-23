<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn
          v-if="canGoBack"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Back"
          @click="$router.push('/')"
        />
        <q-toolbar-title class="text-weight-bold">
          Próximo Ônibus
        </q-toolbar-title>
        
        <q-btn
          v-if="$route.path === '/'"
          flat
          dense
          round
          icon="settings"
          aria-label="Settings"
          @click="$router.push('/setup')"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const canGoBack = computed(() => route.path !== '/');
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
