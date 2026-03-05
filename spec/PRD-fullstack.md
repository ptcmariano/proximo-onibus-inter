# PRD - app Proximo Ônibus

## 1. Visão Geral

O Proximo Ônibus é um aplicativo que permite aos usuários consultar os horários de ônibus da cidade dele, para linhas que mais usam

Dor: a ansiedade e a perda de tempo esperando o ônibus

O app vai facilitar encontrar a informação qual é o proximo ônibus e qual o itinerario do dia

## 2. Funcionalidades

### 2.1. Proximo horario do onibus

O usuário vai consultar o próximo horário de ônibus que ele favoritou sendo do perfil que ele mais usa uma linha intermunicipal

O proximo onibus vai ser exibido de acordo com a data/hora que está e o dia da semana, buscando do itinerario o proximo

### 2.2. Horários do dia

O usuário vai poder ver todos os horarios do dia da linha que ele favoritou, facilmente ter acesso e se planejar para qual horario é melhor estar no ponto e qual serão os proximos horarios

### 2.3. Favoritar uma linha

O usuário vai poder favoritar uma linha de ônibus que ele mais usa, para que ele possa ter acesso rápido aos horarios

Caso ja tenha uma linha favoritada, o app vai remover a existente e adicionar a nova

Caso ele não tenha nenhum linha favoritada a principal ação dele será escolher uma linha para favoritar

## 3. Requisitos

### 3.1. Requisitos Funcionais

- O usuário vai poder favoritar uma linha de ônibus que ele mais usa, para que ele possa ter acesso rápido aos horarios
- O usuário vai poder ver o próximo horário de ônibus que ele favoritou
- O usuário vai poder ver todos os horários do dia da linha que ele favoritou
- O usuário vai poder ver o itinerário da linha que ele favoritou (por dias da semana)
- O usuário vai poder ver o itinerário de forma guess sem cadastro inicialmente, sendo necessário cadastro para favoritar uma linha

### 3.2. Requisitos Não Funcionais

- O aplicativo deve ser capaz solicitar uma linha que não exista (campo aberto de texto para pedir)
- O aplicativo não vai exibir horários de ônibus em tempo real, é feito uma busca no banco de dados e exibido o próximo horário
- O aplicativo vai ter uma rotina de atualização de horarios de onibus manual preenchendo um formulario pelo administrador

## 4. Arquitetura

- O aplicativo vai ser desenvolvido em flask para backend
- O aplicativo vai ser desenvolvido em quasar (vue e vite) para frontend
- O aplicativo vai ter uma arquitetura limpa com simplicidade e escalabilidade para o backend
- O aplicativo vai ser executado em docker e gerenciado com docker-compose
- O aplicativo vai ter uma arquitetura monolítica separada em pastas de frontend e backend
