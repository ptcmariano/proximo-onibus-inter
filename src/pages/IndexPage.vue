<template>
  <q-page class="q-pa-md bg-grey-1 column justify-center items-center" v-if="loading">
    <q-spinner-dots color="primary" size="3em" />
  </q-page>

  <q-page class="q-pa-md bg-grey-1" v-else>
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder q-ma-none text-dark">Olá,</h1>
        <div class="text-subtitle1 text-grey-8">Para onde vamos hoje?</div>
      </div>
    </div>

    <div v-if="lines.length === 2" class="column q-gutter-y-lg">
      <q-card v-for="(lineId, index) in lines" :key="lineId" class="glass-card full-width no-shadow" bordered>
        <q-card-section @click="$router.push(`/line/${lineId}`)" class="cursor-pointer">
          <div class="row items-center justify-between q-mb-sm">
            <q-badge color="accent" class="text-weight-bold" rounded>{{ index === 0 ? 'IDA' : 'VOLTA' }}</q-badge>
            <q-icon name="directions_bus" size="sm" color="grey-6" />
          </div>
          
          <div class="text-h6 text-weight-bold q-mb-xs">{{ getLineName(lineId) }}</div>
          <div class="text-body2 text-grey-7 q-mb-md">Sentido: {{ getLineDirection(lineId) }}</div>

          <div class="bg-primary text-white q-pa-md rounded-borders shadow-2 column flex-center">
            <div class="text-uppercase text-caption text-weight-medium q-mb-xs" style="letter-spacing: 1px">Próximo Ônibus</div>
            
            <div v-if="getNextTime(lineId)" class="row items-baseline">
               <div class="text-h2 text-weight-bolder">{{ getNextTime(lineId)?.time }}</div>
               <div class="text-subtitle1 q-ml-sm q-mb-sm text-weight-medium opacity-80">{{ getNextTime(lineId)?.minutesLeft }} min</div>
            </div>
            <div v-else class="text-h5 text-weight-bold q-my-sm">
              Sem mais horários hoje
            </div>
          </div>
        </q-card-section>
        
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat color="primary" label="Ver todos os horários" @click="$router.push(`/line/${lineId}`)" />
        </q-card-actions>
      </q-card>
    </div>

    <div v-else class="column flex-center text-center q-mt-xl">
      <q-icon name="route" size="4em" color="grey-4" class="q-mb-md" />
      <div class="text-h6 text-grey-8 q-mb-xs">Nenhum trajeto configurado</div>
      <div class="text-body2 text-grey-6 q-mb-lg">Configure suas linhas para ver os horários mais rapidamente.</div>
      <q-btn color="primary" icon="settings" label="Configurar Trajeto" @click="$router.push('/setup')" rounded unelevated padding="xs lg" />
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBus } from '../composables/useBus';

const router = useRouter();
const { getLineById, getNextBusTime } = useBus();

const loading = ref(true);
const lines = ref<string[]>([]);
const now = ref(new Date());
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  const saved = localStorage.getItem('proximo_onibus_lines');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 2) {
        lines.value = parsed;
      } else {
        void router.push('/setup');
      }
    } catch {
      void router.push('/setup');
    }
  } else {
    void router.push('/setup');
  }

  loading.value = false;

  timer = setInterval(() => {
    now.value = new Date();
  }, 10000); // refresh every 10s
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const getLineName = (id: string) => getLineById(id)?.name || 'Linha Desconhecida';
const getLineDirection = (id: string) => getLineById(id)?.direction || '';
const getNextTime = (id: string) => getNextBusTime(id, now.value);

</script>

<style scoped>
.glass-card {
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
}
.opacity-80 {
  opacity: 0.8;
}
</style>
