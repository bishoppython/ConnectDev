# 🤝 ConnectHub - Plataforma de Conexões Sociais

Uma aplicação moderna estilo Tinder focada em **múltiplos tipos de conexões**: amizade, networking, namoro, parcerias de negócios e muito mais.

![ConnectHub Preview](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

---

## 🎯 O que é o ConnectHub?

ConnectHub é uma plataforma que vai além do namoro tradicional. Aqui você pode:

- 💼 **Networking Profissional** - Encontre parceiros de negócios e colaboradores
- 👥 **Fazer Amizades** - Conheça pessoas com interesses similares
- 💕 **Relacionamentos** - Encontre alguém especial para namorar
- 💡 **Parcerias de Ideias** - Conecte-se com pessoas para projetos criativos
- 👨‍💻 **Encontrar Desenvolvedores** - Monte sua equipe de tecnologia

---

## ✨ Funcionalidades Principais

### 🔐 Autenticação & Onboarding
- Sistema de login/cadastro intuitivo
- Onboarding em 4 etapas para criar perfil completo
- Escolha múltiplos tipos de conexão que você busca
- Upload de foto de perfil
- Definição de interesses e bio profissional

### 🎴 Interface de Swipe
- **Swipe Right (→)** - Curtir perfil
- **Swipe Left (←)** - Passar
- **Super Like (⭐)** - Demonstrar interesse especial
- Gestos touch e mouse suportados
- Animações suaves e responsivas
- Filtros por tipo de conexão

### 💬 Sistema de Matches
- Detecção automática de matches mútuos
- Modal animado "É um Match!" 
- Lista de todas as suas conexões
- Informações detalhadas de cada match
- Navegação direta para o chat

### 💌 Chat em Tempo Real
- Interface limpa estilo WhatsApp
- Mensagens com timestamps inteligentes
- Auto-scroll para última mensagem
- Persistência de conversas
- Indicadores visuais de mensagens enviadas/recebidas

---

### 🌳 Estrutura de Diretórios

```

tinder-app/
├── 📂 app/                  \# Rotas e páginas principais (Next.js App Router)
│   ├── 📁 (autenticacao)/    \# Grupo de rotas (Layout sem navegação principal)
│   │   ├── 📁 auth/          \# Login e Cadastro
│   │   └── 📁 onboarding/    \# Fluxo de Criação de Perfil
│   ├── 📁 (principal)/       \# Grupo de rotas (Layout com navegação inferior)
│   │   ├── 📁 discover/      \# Interface principal de swipe
│   │   ├── 📁 matches/       \# Lista de Matches
│   │   ├── 📁 chat/[id]/     \# Chat individual dinâmico
│   │   └── 📁 profile/       \# Perfil do Usuário
│   ├── 📄 layout.tsx         \# Layout raiz com Providers globais
│   ├── 📄 page.tsx           \# Landing Page ou Redirecionamento Inicial
│   └── 💅 globals.css        \# Estilos globais (Tailwind/CSS)
│
├── ⚙️ components/            \# Componentes reutilizáveis de UI
│   ├── 📄 profile-card.tsx   \# Card de perfil com lógica de swipe
│   ├── 📄 bottom-nav.tsx     \# Barra de navegação inferior
│   ├── 📄 match-modal.tsx    \# Modal exibido após um Match
│   ├── 📄 filter-dialog.tsx  \# Diálogo de Filtros de Busca
│   └── 🎨 ui/               \# Componentes de baixo nível (shadcn/ui, botões, etc.)
│
├── 📚 lib/                  \# Lógica de negócio, Hooks customizados e Contextos
│   ├── ⚛️ context/           \# Contextos de React (Providers)
│   │   ├── 📄 auth-context.tsx      \# Gerenciamento de Autenticação
│   │   ├── 📄 matches-context.tsx   \# Gerenciamento de Matches (estado global)
│   │   └── 📄 messages-context.tsx  \# Gerenciamento de Mensagens
│   ├── 📄 types.ts           \# Definições globais de Tipos (TypeScript)
│   ├── 📄 mock-data.ts       \# Dados de exemplo para desenvolvimento
│   └── 📄 utils.ts           \# Funções utilitárias diversas
│
├── 🛠️ scripts/               \# Scripts de banco de dados ou automação
│   ├── 📄 01-create-tables.sql   \# Schema inicial do banco
│   ├── 📄 02-create-functions.sql\# Funções SQL e Stored Procedures
│   └── 📄 03-enable-rls.sql      \# Configurações de Row Level Security (RLS)
│
└── 🖼️ public/               \# Assets estáticos
├── 📁 images/
└── 📄 favicon.ico

````

---

## 🚀 Como Usar

### 1️⃣ Primeira Vez no App

1. **Acesse a Landing Page** - Veja a apresentação do ConnectHub
2. **Clique em "Começar Agora"** - Inicie seu cadastro
3. **Faça Login ou Cadastro** - Use qualquer email/senha (mock)
4. **Complete o Onboarding**:
   - **Etapa 1**: Nome e data de nascimento
   - **Etapa 2**: Foto de perfil
   - **Etapa 3**: Bio e profissão
   - **Etapa 4**: Interesses e tipos de conexão

### 2️⃣ Descobrindo Pessoas

1. **Navegue até "Descobrir"** (ícone de fogo 🔥)
2. **Veja os cards de perfis**:
   - Arraste para a **direita** para curtir ❤️
   - Arraste para a **esquerda** para passar ✖️
   - Clique no **botão estrela** para super like ⭐
3. **Use os filtros** (ícone de ajustes) para refinar sua busca
4. **Quando houver match mútuo**, aparecerá o modal "É um Match!"

### 3️⃣ Conversando com Matches

1. **Acesse "Matches"** (ícone de chat 💬)
2. **Veja todos os seus matches** organizados por tipo
3. **Clique em um match** para abrir o chat
4. **Envie mensagens** e construa conexões!

### 4️⃣ Gerenciando seu Perfil

1. **Acesse "Perfil"** (ícone de usuário 👤)
2. **Veja suas informações** e estatísticas
3. **Edite seus dados** (em breve)
4. **Faça logout** quando necessário

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **Next.js 15** | Framework React com App Router |
| **TypeScript** | Tipagem estática para JavaScript |
| **Tailwind CSS v4** | Framework CSS utilitário |
| **shadcn/ui** | Componentes UI acessíveis |
| **React Context** | Gerenciamento de estado global |
| **LocalStorage** | Persistência de dados (mock) |
| **Supabase** (opcional) | Banco de dados e autenticação |

---

## 🔌 Integrando com Supabase

Atualmente o app usa dados mockados. Para conectar com banco de dados real:

### Passo 1: Adicionar Integração

1. Clique em **"Connect"** na barra lateral do v0
2. Selecione **Supabase**
3. Siga as instruções para conectar

### Passo 2: Executar Scripts SQL

Os scripts já estão prontos em `/scripts`:

1. **01-create-tables.sql** - Cria as tabelas necessárias
2. **02-create-functions.sql** - Adiciona funções automáticas
3. **03-enable-rls.sql** - Ativa segurança Row Level Security

Execute-os diretamente no v0 ou no Supabase SQL Editor.

### Passo 3: Atualizar Código

Substitua as chamadas mock por chamadas reais ao Supabase:

\`\`\`typescript
// Antes (mock)
const user = mockUsers.find(u => u.email === email)

// Depois (Supabase)
const { data: user } = await supabase
  .from('profiles')
  .select('*')
  .eq('email', email)
  .single()
\`\`\`

---

## 📊 Schema do Banco de Dados

\`\`\`mermaid
erDiagram
    profiles ||--o{ swipes : gives
    profiles ||--o{ matches : has
    profiles ||--o{ messages : sends
    
    profiles {
        uuid id PK
        string email
        string full_name
        date birth_date
        string photo_url
        text bio
        string occupation
        jsonb interests
        jsonb looking_for
        timestamp created_at
    }
    
    swipes {
        uuid id PK
        uuid swiper_id FK
        uuid swiped_id FK
        string direction
        timestamp created_at
    }
    
    matches {
        uuid id PK
        uuid profile1_id FK
        uuid profile2_id FK
        timestamp matched_at
    }
    
    messages {
        uuid id PK
        uuid match_id FK
        uuid sender_id FK
        text content
        timestamp sent_at
    }
\`\`\`

---

## 🎨 Design System

### Cores Principais

\`\`\`css
/* Gradiente Principal (Tinder-inspired) */
--gradient-primary: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)

/* Cores de Ação */
--color-like: #00D084      /* Verde - Like */
--color-dislike: #FF6B6B   /* Vermelho - Dislike */
--color-superlike: #4A90E2 /* Azul - Super Like */

/* Neutrals */
--background: #FFFFFF
--foreground: #1A1A1A
--muted: #F5F5F5
\`\`\`

### Tipografia

- **Headings**: `font-sans` (Geist Sans)
- **Body**: `font-sans` (Geist Sans)
- **Code**: `font-mono` (Geist Mono)

### Espaçamento

Seguimos a escala do Tailwind: `4, 8, 12, 16, 24, 32, 48, 64px`

---

## 🎯 Tipos de Conexão

O ConnectHub suporta 6 tipos de conexão:

| Tipo | Ícone | Descrição |
|------|-------|-----------|
| **Amizade** | 👥 | Fazer novos amigos |
| **Networking** | 💼 | Conexões profissionais |
| **Namoro** | 💕 | Relacionamentos românticos |
| **Parceria de Negócios** | 🤝 | Empreendedores e sócios |
| **Parceria de Ideias** | 💡 | Projetos criativos |
| **Encontrar Desenvolvedores** | 👨‍💻 | Montar equipe tech |

---

## 🔒 Segurança & Privacidade

### Row Level Security (RLS)

Quando conectado ao Supabase, todas as tabelas têm políticas RLS:

- ✅ Usuários só veem seus próprios dados
- ✅ Matches só são visíveis para os envolvidos
- ✅ Mensagens são privadas entre os participantes
- ✅ Swipes são anônimos até haver match

### Autenticação

- Senhas são hasheadas (quando usar Supabase)
- Tokens JWT para sessões
- Refresh tokens automáticos
- Logout seguro

---

## 📱 Responsividade

O ConnectHub é **100% responsivo**:

- 📱 **Mobile First** - Otimizado para celulares
- 💻 **Desktop** - Interface adaptada para telas grandes
- 🖥️ **Tablet** - Layout intermediário
- 👆 **Touch & Mouse** - Gestos funcionam em todos os dispositivos

---

## 🚧 Próximos Passos

### Funcionalidades Futuras

- [ ] Edição de perfil
- [ ] Upload múltiplo de fotos
- [ ] Verificação de perfil
- [ ] Filtros avançados (localização, idade, etc.)
- [ ] Notificações push
- [ ] Videochamadas
- [ ] Stories (estilo Instagram)
- [ ] Modo escuro
- [ ] Internacionalização (i18n)

### Melhorias Técnicas

- [ ] Testes unitários e E2E
- [ ] Otimização de imagens
- [ ] Cache de dados
- [ ] Infinite scroll nos matches
- [ ] WebSockets para chat em tempo real
- [ ] PWA (Progressive Web App)

---

## 🤝 Contribuindo

Este projeto foi criado com v0 by Vercel. Para contribuir:

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm run dev`
4. Faça suas alterações
5. Envie um Pull Request

---

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

---

## 💬 Suporte

Precisa de ajuda? 

- 📧 Email: support@connecthub.app
- 💬 Discord: [ConnectHub Community](#)
- 📚 Docs: [docs.connecthub.app](#)

---

<div align="center">

**Feito com ❤️ usando v0 by Vercel**

[Website](#) • [Twitter](#) • [LinkedIn](#)

</div>
# ConnectDev
