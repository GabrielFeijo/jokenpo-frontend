# 🪨📄✂️ Jokenpo - Multiplayer Arena

Um jogo moderno e interativo de **Pedra, Papel e Tesoura** construído com React, TypeScript e WebSocket para partidas multijogador em tempo real. Projeto inspirado no desafio do [Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH) com funcionalidades expandida.

<img src="https://i.imgur.com/K5jhFiR.gif" />

## 📸 Screenshots

![Lobby Principal](https://i.imgur.com/d2GINMV.png)
_Tela inicial com menu de opções_

![Arena de Batalha](https://i.imgur.com/WwYHDza.png)
_Tela principal do jogo durante as partidas_

![Dashboard de Estatísticas](https://i.imgur.com/NtWbUCP.png)
_Painel com estatísticas e histórico de batalhas_

## ✨ Funcionalidades

### 🎮 Modos de Jogo

- **🎯 Modo Clássico**: Pedra, Papel e Tesoura tradicional
- **⚡ Modo Estendido**: Inclui Lagarto e Spock para maior complexidade

### 🌐 Multiplayer Online

- **Salas Privadas**: Crie salas com códigos únicos para jogar com amigos
- **WebSocket em Tempo Real**: Comunicação instantânea entre jogadores
- **Sistema de Convites**: Compartilhe códigos de sala facilmente

### 📊 Sistema de Estatísticas

- **Dashboard Interativo**: Acompanhe suas conquistas e performance
- **Histórico de Batalhas**: Veja todas as suas partidas anteriores
- **Estatísticas Globais**: Compare-se com outros jogadores

### 🎨 Interface Moderna

- **Animações Fluidas**: Transições suaves com Framer Motion
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile

### 🚀 Funcionalidades Técnicas

- **Recuperação de Estado**: Reconecte-se a jogos em andamento
- **Gestão de Usuários**: Sistema de usuários convidados
- **Cache de Dados**: Performance otimizada com React Query

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend da API rodando (repositório separado)

## 🚀 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/GabrielFeijo/jokenpo-frontend.git
   cd jokenpo-frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto:

   ```env
   VITE_API_BASE_URL=http://localhost:3333
   ```

4. **Execute o projeto**

   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**

   Abra seu navegador e acesse: `http://localhost:5173`

## ⚙️ Variáveis de Ambiente

| Variável            | Descrição             | Exemplo                 | Obrigatória |
| ------------------- | --------------------- | ----------------------- | ----------- |
| `VITE_API_BASE_URL` | URL da API do backend | `http://localhost:3333` | ✅          |

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── battle-history-item.tsx    # Item do histórico de batalhas
│   ├── choice-button.tsx          # Botões de escolha (Pedra, Papel, etc.)
│   ├── choice-screen.tsx          # Tela de seleção de jogadas
│   ├── create-room.tsx            # Modal de criação de salas
│   ├── filters-modal.tsx          # Modal de filtros avançados
│   ├── game-header.tsx            # Cabeçalho do jogo
│   ├── game-recovery-*.tsx        # Componentes de recuperação de estado
│   ├── join-room.tsx              # Modal para entrar em salas
│   ├── lobby-menu.tsx             # Menu principal do lobby
│   ├── reveal-screen.tsx          # Tela de resultado da partida
│   ├── room-status.tsx            # Status da sala atual
│   ├── rules-modal.tsx            # Modal com regras do jogo
│   ├── stat-card.tsx              # Cards de estatísticas
│   └── waiting-room-screen.tsx    # Tela de espera por oponente
├── hooks/               # Custom hooks
│   ├── useApi.ts       # Hooks para chamadas da API
│   └── useGameRecovery.ts # Hook para recuperação de estado
├── pages/               # Páginas da aplicação
│   ├── dashboard.tsx   # Dashboard de estatísticas
│   ├── game-screen.tsx # Tela principal do jogo
│   └── lobby-screen.tsx # Tela do lobby
├── services/            # Serviços externos
│   ├── api.ts          # Configuração da API REST
│   └── websocket.ts    # Gerenciamento do WebSocket
├── store/               # Gerenciamento de estado global
│   ├── game.selectors.ts # Seletores do estado do jogo
│   ├── game.types.ts    # Tipos do estado do jogo
│   └── gameStore.ts     # Store principal com Zustand
├── types/               # Definições de tipos TypeScript
│   └── game.ts         # Tipos relacionados ao jogo
└── utils/               # Utilitários
    └── get-choice-icon.tsx # Helper para ícones das escolhas
```

## 🎮 Como Jogar

### 🎯 Modo Clássico

- **📄 Papel** vence **🪨 Pedra**
- **🪨 Pedra** vence **✂️ Tesoura**
- **✂️ Tesoura** vence **📄 Papel**

### ⚡ Modo Estendido

- **🪨 Pedra** vence **✂️ Tesoura** e **🦎 Lagarto**
- **📄 Papel** vence **🪨 Pedra** e **🖖 Spock**
- **✂️ Tesoura** vence **📄 Papel** e **🦎 Lagarto**
- **🦎 Lagarto** vence **🖖 Spock** e **📄 Papel**
- **🖖 Spock** vence **✂️ Tesoura** e **🪨 Pedra**

### 🚀 Iniciando uma Partida

1. **Criar Sala**: Escolha o modo de jogo e crie uma arena privada
2. **Convite**: Compartilhe o código da sala com seu oponente
3. **Preparação**: Ambos jogadores clicam em "Estou Pronto!"
4. **Batalha**: Façam suas escolhas simultaneamente
5. **Resultado**: Veja quem venceu a rodada
6. **Revanche**: Clique em "Jogar Novamente" para uma nova rodada

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção

# Qualidade de Código
npm run lint         # Executa ESLint
```

## 🛠️ Tecnologias Utilizadas

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="50" height="50" alt="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="50" height="50" alt="TypeScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="50" height="50" alt="Vite"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="50" height="50" alt="TailwindCSS"/>
</div>
