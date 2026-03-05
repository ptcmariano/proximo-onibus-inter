Perfeito 👌  
Vou estruturar isso como um **pacote completo de Analytics + História de Usuário + Métricas + Critérios de Aceitação + Eventos Técnicos**, já pensando em algo que você possa implementar direto no Quasar/Vue.

---

# 🎯 Objetivo de Analytics do Produto

Validar se o app está cumprindo sua promessa principal:

> “Responder imediatamente à pergunta: Quanto tempo falta para o meu ônibus?”

Ou seja, medir:
- Se o usuário configura o trajeto
- Se ele volta ao app
- Se ele consulta rapidamente
- Se ele expande horários
- Se o fluxo é realmente frictionless

---

# 📘 EPIC 1 — Consulta Rápida do Próximo Ônibus

## 🎭 História de Usuário

**Como** usuário que pega ônibus intermunicipal todos os dias  
**Eu quero** abrir o app e ver imediatamente quanto tempo falta para o próximo ônibus (ida e volta)  
**Para** reduzir minha ansiedade e evitar perder tempo no ponto.

---

## ✅ Critérios de Aceitação (Produto)

1. Ao abrir o app:
   - Se houver linhas favoritadas → exibir imediatamente os próximos horários.
   - Se não houver → exibir tela de seleção de linhas.

2. O cálculo do próximo horário deve:
   - Considerar data e hora local.
   - Considerar dia da semana.
   - Exibir fallback (“Sem mais horários hoje”).

3. O tempo até o próximo ônibus deve estar visível sem scroll.

4. O tempo de carregamento da tela inicial deve ser < 1 segundo (dados locais).

---

## 📊 Métricas de Produto (KPIs)

### 🎯 Métrica Principal (North Star)

**% de Sessões com Visualização de Próximo Horário**

```
Sessões com evento "next_bus_viewed" 
÷ 
Total de sessões iniciadas
```

Meta saudável: > 85%

---

### 📈 Métricas Secundárias

| Métrica | O que mede | Meta |
|----------|------------|------|
| Tempo até primeira visualização | Se a promessa é instantânea | < 2s |
| Taxa de configuração inicial | % que selecionam 2 linhas | > 70% |
| Frequência semanal de uso | Engajamento | 3+ acessos/semana |
| Expansão de horários do dia | Profundidade de uso | 30%+ |

---

# 🧠 Eventos de Analytics (Mapa Técnico)

Aqui está o tracking ideal:

---

## 🔹 Evento: `app_opened`

Disparar:
- Ao montar App.vue

Payload:

```json
{
  "has_favorites": true,
  "day_of_week": "monday",
  "hour": 7
}
```

---

## 🔹 Evento: `favorites_configured`

Disparar:
- Quando usuário salva as 2 linhas

Payload:

```json
{
  "line_outbound": "Linha X - Centro",
  "line_return": "Linha Y - Bairro"
}
```

Métrica:
- Conversão de onboarding

---

## 🔹 Evento: `next_bus_viewed`

Disparar:
- Quando o cálculo do próximo horário é feito com sucesso

Payload:

```json
{
  "line": "Linha X - Centro",
  "minutes_until_next": 12,
  "period": "weekday"
}
```

---

## 🔹 Evento: `full_schedule_expanded`

Disparar:
- Quando usuário abre lista completa do dia

Payload:

```json
{
  "line": "Linha X - Centro"
}
```

---

## 🔹 Evento: `favorites_changed`

Disparar:
- Quando usuário altera as linhas favoritas

---

# 📊 Funil Principal (Para Monitorar Saúde do Produto)

```
App Opened
   ↓
Favorites Configured
   ↓
Next Bus Viewed
   ↓
Full Schedule Viewed (opcional)
   ↓
Return Within 7 Days
```

---

# 🧪 Métricas de Retenção

## Retenção D1
Usuário voltou no dia seguinte?

## Retenção D7
Usuário voltou dentro de 7 dias?

Meta saudável para utilitário diário:
- D1 > 40%
- D7 > 60%

---

# 🧩 História de Usuário Técnica (Para Dev)

## História Técnica — Cálculo do Próximo Ônibus

**Como sistema**,  
**Eu preciso** calcular o próximo horário com base no dia e hora local,  
**Para** exibir o tempo restante corretamente.

### Regras Técnicas:

1. Identificar dia:
   ```js
   const today = new Date()
   const day = today.getDay()
   ```

2. Mapear para:
   - Dias úteis
   - Sábado
   - Domingo/feriado

3. Filtrar horários > horário atual.

4. Selecionar o menor horário válido.

5. Se não existir:
   - Retornar status `"no_more_buses_today"`

---

## Critérios Técnicos de Aceitação

- O cálculo deve executar em < 10ms.
- Não pode depender de API externa.
- Deve funcionar offline.
- Deve tratar:
  - Mudança de dia às 00:00.
  - Horários exatamente iguais ao horário atual.

---

# 🔬 Indicadores de Fricção (Muito Importante)

Se qualquer um desses subir, há problema de UX:

| Indicador | Alerta |
|------------|---------|
| % que abrem app e não configuram linhas | > 40% |
| % que configuram mas não voltam | > 50% |
| Tempo médio na tela inicial > 20s | Pode indicar confusão |
| Muitas trocas de favoritas | Falta clareza na busca |

---

# 🧭 Métrica de Valor Real

A pergunta é:

> O usuário está usando isso como ferramenta diária?

Você pode medir isso com:

### ✅ Média de acessos entre 6h–9h e 16h–19h

Se a maioria das sessões estiver nesses horários → produto alinhado com a dor real.

---

# 🧱 Sugestão de Stack de Analytics

Como é PWA simples:

- Google Analytics 4
- PostHog (melhor para produto)
- Plausible (mais simples)
- Ou até armazenar logs temporários em IndexedDB

---

# 🧠 Insight Estratégico

Seu app é um utilitário de altíssima recorrência.

O sucesso NÃO é:
- Usuário passar muito tempo
- Explorar muitas telas

O sucesso é:
- Abrir
- Olhar
- Fechar
- Voltar amanhã

---

# 🎯 Resumo Executivo

Você deve medir:

1. Configuração inicial
2. Visualização do próximo horário
3. Retenção semanal
4. Frequência por horário do dia
5. Expansão da lista completa

Se:
- >70% configuram
- >80% veem próximo horário
- >60% voltam na semana

👉 Seu produto está resolvendo a dor real.

npx quasar new boot google-analytics --format ts