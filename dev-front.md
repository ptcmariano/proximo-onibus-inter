como especialista ui/ux em quasar vuejs crie o app Próximo Ônibus

## 1. Visão Geral

O **Próximo Ônibus** é um aplicativo minimalista e direto ao ponto que permite aos usuários consultar rapidamente os horários das linhas de ônibus intermunicipais que mais utilizam. 

**Dor:** A ansiedade e a perda de tempo esperando o ônibus no ponto sem saber quando ele vai passar.
**Solução:** Uma interface absurdamente limpa e sem atritos (frictionless) que responde imediatamente à pergunta: *"Quanto tempo falta para o meu ônibus?"*, exibindo o próximo horário e o itinerário do dia com base no trajeto de ida e volta do usuário.

## 2. Funcionalidades

### 2.1. Tela Inicial Limpa (Próximo Horário)
A tela principal será focada na "glanceability" (bater o olho e entender). Ela exibirá simultaneamente o próximo horário para as **2 linhas do trajeto favoritado (Ida e Volta)**. 
O sistema calculará automaticamente o próximo ônibus de acordo com a data/hora local e o dia da semana. O usuário decidirá facilmente qual quadro olhar (ida ou volta) dependendo do momento do seu dia.

### 2.2. Horários do Dia
A partir da tela inicial, o usuário poderá expandir ou acessar facilmente a lista completa com todos os horários do dia para as suas linhas favoritadas. Isso permite que ele se planeje para qual horário é melhor estar no ponto e quais serão as opções seguintes.

### 2.3. Favoritar Trajeto (Ida e Volta) sem Cadastro
O usuário não precisará criar conta. Ao abrir o app pela primeira vez, a principal (e única) ação será escolher **2 linhas** para compor o seu trajeto diário (ex: Linha X - Sentido Centro; Linha Y - Sentido Bairro). 
Essas escolhas serão salvas localmente no dispositivo do usuário (`localStorage`), garantindo uma experiência instantânea nos próximos acessos. Caso queira mudar a rotina, ele poderá substituir as duas linhas salvas por novas.

## 3. Requisitos

### 3.1. Requisitos Funcionais
- O aplicativo não exigirá nenhum tipo de cadastro ou login do usuário final.
- O usuário deve poder buscar e selecionar exatamente 2 linhas de ônibus (trajeto de ida e volta) para favoritar.
- O aplicativo deve salvar as linhas favoritas no `localStorage` do navegador/dispositivo.
- O aplicativo deve exibir o próximo horário de ônibus para as 2 linhas favoritadas, calculando com base na hora e dia da semana atuais.
- O usuário deve poder visualizar todos os horários do dia das linhas que favoritou.
- O usuário deve poder visualizar o itinerário da linha (separado por dias da semana: dias úteis, sábados, domingos/feriados).

### 3.2. Requisitos Não Funcionais
- O aplicativo não exibirá horários de ônibus em tempo real (GPS); a exibição é baseada em uma busca estática no banco de dados.
- O aplicativo terá uma rotina de atualização de horários de ônibus manual, onde o administrador preencherá um formulário no painel de controle.

## 4. Arquitetura
- **Frontend:** Desenvolvido em Quasar Framework (Vue.js e Vite) para garantir um visual moderno e responsivo (PWA/Mobile).
- **Padrão:** Arquitetura simples apenas arquivos estaticos e dados gravados no localStorage

## desicoes tecnicas

1. caso tenha ambiguidade na documentação, use o bom senso e crie a melhor solução possível
2. documentar todas as decisões tecnicas no arquivo desicoes-tecnicas.md
3. como desenvolvedor especialista em quasar vuejs e ui/ux, crie o app seguindo as melhores praticas de mercado