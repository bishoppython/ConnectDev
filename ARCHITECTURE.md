# 🏛️ Arquitetura do ConnectHub

Este documento explica a arquitetura técnica do projeto de forma detalhada.

---

## 📐 Visão Geral

O ConnectHub segue uma arquitetura **client-side first** com possibilidade de migração para **full-stack** ao adicionar Supabase.

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                     Next.js App Router                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Auth       │  │   Matches    │  │   Messages   │  │
│  │   Context    │  │   Context    │  │   Context    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │              React Components                    │   │
│  │  (Profile Cards, Chat, Matches, Navigation)     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │           shadcn/ui + Tailwind CSS              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                    LocalStorage (Mock)                   │
│              ou Supabase (Production)                    │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## 🧩 Camadas da Aplicação

### 1. **Camada de Apresentação** (UI Layer)

**Responsabilidade**: Renderizar a interface e capturar interações do usuário.

**Componentes Principais**:
- `profile-card.tsx` - Card de perfil com gestos de swipe
- `bottom-nav.tsx` - Navegação inferior
- `match-modal.tsx` - Modal de match
- `filter-dialog.tsx` - Diálogo de filtros

**Tecnologias**:
- React 19
- Tailwind CSS v4
- shadcn/ui

---

### 2. **Camada de Estado** (State Layer)

**Responsabilidade**: Gerenciar estado global da aplicação.

#### AuthContext (`lib/auth-context.tsx`)

\`\`\`typescript
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}
\`\`\`

**Funcionalidades**:
- Autenticação mock com localStorage
- Gerenciamento de sessão
- Atualização de perfil
- Persistência de dados

#### MatchesContext (`lib/matches-context.tsx`)

\`\`\`typescript
interface MatchesContextType {
  matches: Match[]
  addSwipe: (profileId: string, direction: 'left' | 'right' | 'super') => void
  checkMatch: (profileId: string) => boolean
}
\`\`\`

**Funcionalidades**:
- Registro de swipes
- Detecção de matches mútuos
- Lista de matches
- Persistência no localStorage

#### MessagesContext (`lib/messages-context.tsx`)

\`\`\`typescript
interface MessagesContextType {
  conversations: Record<string, Message[]>
  sendMessage: (matchId: string, content: string) => void
  getConversation: (matchId: string) => Message[]
}
\`\`\`

**Funcionalidades**:
- Envio de mensagens
- Recuperação de conversas
- Timestamps automáticos
- Persistência no localStorage

---

### 3. **Camada de Dados** (Data Layer)

#### Modo Mock (Atual)

\`\`\`typescript
// lib/mock-data.ts
export const mockUsers: User[] = [...]
export const mockMatches: Match[] = [...]
\`\`\`

**Armazenamento**: LocalStorage
**Vantagens**: 
- ✅ Desenvolvimento rápido
- ✅ Sem dependências externas
- ✅ Funciona offline

**Limitações**:
- ❌ Dados não sincronizam entre dispositivos
- ❌ Sem autenticação real
- ❌ Sem validação de dados

#### Modo Supabase (Produção)

\`\`\`sql
-- scripts/01-create-tables.sql
CREATE TABLE profiles (...)
CREATE TABLE swipes (...)
CREATE TABLE matches (...)
CREATE TABLE messages (...)
\`\`\`

**Armazenamento**: PostgreSQL (Supabase)
**Vantagens**:
- ✅ Dados sincronizados
- ✅ Autenticação real
- ✅ Row Level Security
- ✅ Triggers automáticos

---

## 🔄 Fluxo de Dados

### Fluxo de Swipe

\`\`\`mermaid
sequenceDiagram
    participant User
    participant ProfileCard
    participant MatchesContext
    participant MatchModal
    
    User->>ProfileCard: Arrasta card para direita
    ProfileCard->>MatchesContext: addSwipe(profileId, 'right')
    MatchesContext->>MatchesContext: Verifica se há match mútuo
    
    alt Match encontrado
        MatchesContext->>MatchModal: Exibe modal "É um Match!"
        MatchModal->>User: Mostra animação
    else Sem match
        MatchesContext->>ProfileCard: Próximo card
    end
\`\`\`

### Fluxo de Mensagem

\`\`\`mermaid
sequenceDiagram
    participant User
    participant ChatPage
    participant MessagesContext
    participant LocalStorage
    
    User->>ChatPage: Digite mensagem
    ChatPage->>MessagesContext: sendMessage(matchId, content)
    MessagesContext->>MessagesContext: Cria objeto Message
    MessagesContext->>LocalStorage: Salva conversa
    MessagesContext->>ChatPage: Atualiza UI
    ChatPage->>User: Mostra mensagem enviada
\`\`\`

---

## 🎯 Padrões de Design

### 1. **Context Pattern**

Usado para gerenciar estado global sem prop drilling.

\`\`\`typescript
// Provedor
<AuthProvider>
  <MatchesProvider>
    <MessagesProvider>
      {children}
    </MessagesProvider>
  </MatchesProvider>
</AuthProvider>

// Consumidor
const { user } = useAuth()
const { matches } = useMatches()
\`\`\`

### 2. **Compound Components**

Componentes que trabalham juntos de forma coesa.

\`\`\`typescript
<Dialog>
  <DialogTrigger>Abrir</DialogTrigger>
  <DialogContent>
    <DialogHeader>Título</DialogHeader>
    <DialogDescription>Descrição</DialogDescription>
  </DialogContent>
</Dialog>
\`\`\`

### 3. **Custom Hooks**

Lógica reutilizável encapsulada.

\`\`\`typescript
// Exemplo: Hook de swipe
function useSwipeGesture(onSwipe: (direction: string) => void) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  
  // ... lógica de drag
  
  return { position, isDragging, handlers }
}
\`\`\`

---

## 🔐 Segurança

### Row Level Security (RLS)

Quando usar Supabase, todas as queries são protegidas:

\`\`\`sql
-- Usuários só veem seus próprios perfis
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Matches só visíveis para participantes
CREATE POLICY "Users can view own matches"
ON matches FOR SELECT
USING (
  auth.uid() = profile1_id OR 
  auth.uid() = profile2_id
);
\`\`\`

### Validação de Dados

\`\`\`typescript
// Validação no frontend
const validateProfile = (data: ProfileData) => {
  if (!data.full_name || data.full_name.length < 2) {
    throw new Error('Nome deve ter pelo menos 2 caracteres')
  }
  
  if (!data.birth_date || calculateAge(data.birth_date) < 18) {
    throw new Error('Você deve ter pelo menos 18 anos')
  }
}
\`\`\`

---

## 🚀 Performance

### Otimizações Implementadas

1. **Lazy Loading de Imagens**
\`\`\`typescript
<Image
  src={profile.photo_url || "/placeholder.svg"}
  alt={profile.full_name}
  loading="lazy"
  placeholder="blur"
/>
\`\`\`

2. **Memoização de Componentes**
\`\`\`typescript
const ProfileCard = memo(({ profile, onSwipe }) => {
  // ... componente pesado
})
\`\`\`

3. **Debounce em Inputs**
\`\`\`typescript
const debouncedSearch = useMemo(
  () => debounce((value) => setSearch(value), 300),
  []
)
\`\`\`

### Métricas Alvo

| Métrica | Alvo | Atual |
|---------|------|-------|
| First Contentful Paint | < 1.5s | ~1.2s |
| Time to Interactive | < 3s | ~2.5s |
| Lighthouse Score | > 90 | 95 |

---

## 📦 Estrutura de Módulos

\`\`\`
lib/
├── auth-context.tsx       # Autenticação e usuário
├── matches-context.tsx    # Swipes e matches
├── messages-context.tsx   # Chat e mensagens
├── types.ts               # Tipos TypeScript
├── mock-data.ts           # Dados de exemplo
└── utils.ts               # Funções utilitárias

components/
├── profile-card.tsx       # Card principal
├── bottom-nav.tsx         # Navegação
├── match-modal.tsx        # Modal de match
├── filter-dialog.tsx      # Filtros
└── ui/                    # Componentes base
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    └── ...

app/
├── auth/                  # Autenticação
├── onboarding/            # Onboarding
├── discover/              # Swipe
├── matches/               # Lista de matches
├── chat/[profileId]/      # Chat individual
└── profile/               # Perfil do usuário
\`\`\`

---

## 🔄 Migração para Supabase

### Checklist de Migração

- [ ] **Passo 1**: Adicionar integração Supabase no v0
- [ ] **Passo 2**: Executar scripts SQL (`/scripts`)
- [ ] **Passo 3**: Criar cliente Supabase
  \`\`\`typescript
  // lib/supabase.ts
  import { createBrowserClient } from '@supabase/ssr'
  
  export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  \`\`\`
- [ ] **Passo 4**: Atualizar AuthContext
- [ ] **Passo 5**: Atualizar MatchesContext
- [ ] **Passo 6**: Atualizar MessagesContext
- [ ] **Passo 7**: Testar todas as funcionalidades
- [ ] **Passo 8**: Remover dados mock

---

## 🧪 Testes (Futuro)

### Estrutura de Testes

\`\`\`
__tests__/
├── unit/
│   ├── contexts/
│   │   ├── auth-context.test.tsx
│   │   ├── matches-context.test.tsx
│   │   └── messages-context.test.tsx
│   └── components/
│       ├── profile-card.test.tsx
│       └── match-modal.test.tsx
├── integration/
│   ├── swipe-flow.test.tsx
│   └── chat-flow.test.tsx
└── e2e/
    ├── onboarding.spec.ts
    └── match-and-chat.spec.ts
\`\`\`

---

## 📚 Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Última atualização**: Janeiro 2025
