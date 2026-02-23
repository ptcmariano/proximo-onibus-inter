<template>
  <q-page class="q-pa-md bg-grey-1 column" v-if="loading">
    <q-spinner-dots color="primary" size="3em" />
  </q-page>
  
  <q-page class="q-pa-md bg-grey-1 column" v-else-if="line">
    <div class="column q-mb-lg">
      <h2 class="text-h5 text-weight-bolder text-dark q-mb-none">{{ line.name }}</h2>
      <div class="text-subtitle1 text-grey-8">{{ line.direction }}</div>
    </div>

    <!-- Abas para diferentes dias da semana -->
    <q-tabs
      v-model="tab"
      dense
      class="text-grey-7 bg-white rounded-borders q-mb-md shadow-1"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="weekdays" label="Dias Úteis" />
      <q-tab name="saturdays" label="Sábado" />
      <q-tab name="sundays" label="Dom/Fer" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <!-- Painéis renderizam os horários do respectivo dia -->
      <q-tab-panel v-for="dayType in dayTypes" :name="dayType" :key="dayType" class="q-pa-none">
        <q-list class="bg-white rounded-borders shadow-1 q-mb-md bordered">
          <q-item v-if="!line.schedule[dayType] || line.schedule[dayType].length === 0">
            <q-item-section class="text-center text-grey-6 q-pa-md">Sem horários cadastrados</q-item-section>
          </q-item>
          
          <div class="row items-center justify-start q-pa-md q-col-gutter-sm">
             <div v-for="(t, i) in line.schedule[dayType]" :key="i" class="col-3 col-sm-2 text-center">
                <q-chip :color="isNext(t.time, dayType) ? 'primary' : 'grey-2'" :text-color="isNext(t.time, dayType) ? 'white' : 'dark'" class="text-weight-bold" style="font-size: 1.1em">
                   {{ t.time }}
                </q-chip>
             </div>
          </div>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>

    <q-card class="full-width no-shadow glass-card q-mt-md" bordered>
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Itinerário</div>
        <div class="text-body2 text-grey-8">
          <div v-for="(stop, index) in line.itinerary" :key="index" class="row items-center q-mb-xs">
            <q-icon name="radio_button_unchecked" size="xs" color="grey-5" class="q-mr-sm" />
            {{ stop }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>

  <q-page class="q-pa-md bg-grey-1 column flex-center" v-else>
    <div class="text-h6 text-grey-8">Linha não encontrada</div>
    <q-btn flat color="primary" label="Voltar" @click="$router.push('/')" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBus } from '../composables/useBus';
import type { BusLine, BusTime } from '../data/lines';

const route = useRoute();
const { getLineById, getDayType } = useBus();

const loading = ref(true);
const line = ref<BusLine | null>(null);
const tab = ref<'weekdays' | 'saturdays' | 'sundays'>('weekdays');
const now = ref(new Date());
const dayTypes = ['weekdays', 'saturdays', 'sundays'] as const;

onMounted(() => {
  const lineId = route.params.id as string;
  if (lineId) {
    line.value = getLineById(lineId) || null;
    if (line.value) {
      tab.value = getDayType(now.value);
    }
  }
  loading.value = false;
});

const timeToMinutes = (timeString: string) => {
  const [h, m] = timeString.split(':').map(Number);
  if (h === undefined || m === undefined) return 0;
  return h * 60 + m;
};

const isNext = (timeStr: string, panelDay: string) => {
  if (panelDay !== getDayType(now.value)) return false;
  
  const currentMins = now.value.getHours() * 60 + now.value.getMinutes();
  const timeMins = timeToMinutes(timeStr);
  
  if (timeMins < currentMins) return false;
  
  // Encontrar o menor horário futuro no schedule de hoje
  if (!line.value) return false;
  const scheduleToday = line.value.schedule[panelDay as keyof typeof line.value.schedule];
  const nextTimeObj = scheduleToday.find((t: BusTime) => timeToMinutes(t.time) >= currentMins);
  
  return nextTimeObj && nextTimeObj.time === timeStr;
};

</script>

<style scoped>
.glass-card {
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
}
</style>
