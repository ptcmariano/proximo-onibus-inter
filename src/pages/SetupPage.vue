<template>
  <q-page class="q-pa-md bg-grey-1 column">
    <div class="row items-center q-mb-lg">
      <div class="column">
        <h2 class="text-h4 text-weight-bolder text-dark q-mb-sm">Seu trajeto</h2>
        <div class="text-body1 text-grey-7">Adicione sua principal rota de ida e volta. Não é necessário criar conta. {{ dataAtualizacao }}</div>
      </div>
    </div>

    <div class="column q-gutter-y-lg flex-1">
      <q-card class="full-width no-shadow glass-card q-pa-sm" bordered>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <q-badge color="accent" class="text-weight-bold q-mr-sm" rounded>1</q-badge>
            <div class="text-subtitle1 text-weight-bold text-dark">Linha de IDA</div>
          </div>
          
          <q-select
            v-model="ida"
            :options="busLines"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            outlined
            dense
            bg-color="white"
            label="Ex: 101 - Parque das Flores (Centro)"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ scope.opt.name }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.direction }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
      </q-card>

      <q-card class="full-width no-shadow glass-card q-pa-sm" bordered>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <q-badge color="accent" class="text-weight-bold q-mr-sm" rounded>2</q-badge>
            <div class="text-subtitle1 text-weight-bold text-dark">Linha de VOLTA</div>
          </div>
          
          <q-select
            v-model="volta"
            :options="busLines"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            outlined
            dense
            bg-color="white"
            label="Ex: 101 - Parque das Flores (Bairro)"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ scope.opt.name }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.direction }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
      </q-card>
    </div>

    <div class="row justify-center q-mt-xl q-mb-md">
      <q-btn
        color="primary"
        size="lg"
        label="Salvar Trajeto"
        icon-right="check"
        padding="sm xl"
        rounded
        unelevated
        :disable="!ida || !volta"
        @click="saveSetup"
        class="full-width q-py-md text-weight-bold shadow-4"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBus } from '../composables/useBus';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const { busLines } = useBus();

const ida = ref<string | null>(null);
const volta = ref<string | null>(null);
const dataAtualizacao = ref<string>('Data da base de dados: 22/02/2026 02:54:34');

onMounted(() => {
  const saved = localStorage.getItem('proximo_onibus_lines');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 2) {
        ida.value = parsed[0];
        volta.value = parsed[1];
      }
    } catch (e) {
      console.error(e);
    }
  }

});

const saveSetup = async () => {
  if (ida.value && volta.value) {
    localStorage.setItem('proximo_onibus_lines', JSON.stringify([ida.value, volta.value]));
    $q.notify({
      color: 'positive',
      position: 'top',
      message: 'Trajeto salvo!',
      icon: 'check_circle'
    });
    await router.push('/');
  }
};
</script>

<style scoped>
.glass-card {
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
}
</style>
