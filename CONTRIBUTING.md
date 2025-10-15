# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o ConnectHub! Este guia vai te ajudar a começar.

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Git
- Editor de código (recomendamos VS Code)

### Setup Local

1. **Clone o repositório**
\`\`\`bash
git clone https://github.com/seu-usuario/connecthub.git
cd connecthub
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
\`\`\`

3. **Execute o projeto**
\`\`\`bash
npm run dev
\`\`\`

4. **Acesse no navegador**
\`\`\`
http://localhost:3000
\`\`\`

---

## 📝 Convenções de Código

### TypeScript

- ✅ Use tipos explícitos sempre que possível
- ✅ Evite `any`, prefira `unknown`
- ✅ Use interfaces para objetos, types para unions

\`\`\`typescript
// ✅ Bom
interface User {
  id: string
  name: string
  email: string
}

// ❌ Evite
const user: any = { ... }
\`\`\`

### Componentes React

- ✅ Use function components com hooks
- ✅ Extraia lógica complexa para custom hooks
- ✅ Mantenha componentes pequenos e focados

\`\`\`typescript
// ✅ Bom
export function ProfileCard({ profile }: ProfileCardProps) {
  const { handleSwipe } = useSwipeGesture()
  
  return (...)
}

// ❌ Evite componentes gigantes
\`\`\`

### Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `ProfileCard.tsx` |
| Hooks | camelCase com "use" | `useSwipeGesture.ts` |
| Utilitários | camelCase | `formatDate.ts` |
| Constantes | UPPER_SNAKE_CASE | `MAX_SWIPES_PER_DAY` |
| Tipos/Interfaces | PascalCase | `User`, `MatchData` |

### Tailwind CSS

- ✅ Use classes utilitárias do Tailwind
- ✅ Agrupe classes relacionadas
- ✅ Use design tokens quando possível

\`\`\`tsx
// ✅ Bom
<div className="flex items-center justify-between p-4 bg-background">

// ❌ Evite CSS inline
<div style={{ display: 'flex', padding: '16px' }}>
\`\`\`

---

## 🌿 Git Workflow

### Branches

- `main` - Código em produção
- `develop` - Desenvolvimento ativo
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs
- `docs/*` - Documentação

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`bash
feat: adiciona filtro por localização
fix: corrige bug no swipe em mobile
docs: atualiza README com instruções de deploy
style: ajusta espaçamento no profile card
refactor: extrai lógica de match para hook
test: adiciona testes para AuthContext
\`\`\`

### Pull Requests

1. Crie uma branch a partir de `develop`
\`\`\`bash
git checkout -b feature/nova-funcionalidade
\`\`\`

2. Faça suas alterações e commits

3. Push para o repositório
\`\`\`bash
git push origin feature/nova-funcionalidade
\`\`\`

4. Abra um Pull Request no GitHub

5. Aguarde review e aprovação

---

## 🎯 Áreas para Contribuir

### 🐛 Bugs

Encontrou um bug? Abra uma issue com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (browser, OS, etc.)

### ✨ Novas Funcionalidades

Quer adicionar algo novo?
1. Abra uma issue primeiro para discussão
2. Aguarde feedback da comunidade
3. Implemente após aprovação
4. Envie PR com testes

### 📚 Documentação

Documentação nunca é demais!
- Corrija typos
- Adicione exemplos
- Melhore explicações
- Traduza para outros idiomas

### 🎨 Design

Melhorias visuais são bem-vindas:
- Ajustes de UI/UX
- Animações
- Responsividade
- Acessibilidade

---

## ✅ Checklist de PR

Antes de enviar seu PR, verifique:

- [ ] Código segue as convenções do projeto
- [ ] Componentes são responsivos
- [ ] Funciona em Chrome, Firefox e Safari
- [ ] Não há erros no console
- [ ] Código está comentado quando necessário
- [ ] README atualizado (se aplicável)
- [ ] Commits seguem Conventional Commits

---

## 🧪 Testes (Futuro)

Quando implementarmos testes:

\`\`\`bash
# Rodar todos os testes
npm test

# Testes em watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
\`\`\`

---

## 💬 Comunicação

- 🐛 **Bugs**: Abra uma issue no GitHub
- 💡 **Ideias**: Abra uma discussion no GitHub
- 💬 **Chat**: Entre no nosso Discord
- 📧 **Email**: dev@connecthub.app

---

## 📜 Código de Conduta

Seja respeitoso e inclusivo. Não toleramos:
- Assédio ou discriminação
- Linguagem ofensiva
- Ataques pessoais
- Spam ou autopromoção excessiva

---

## 🎉 Reconhecimento

Todos os contribuidores serão adicionados ao README!

---

**Obrigado por contribuir! 🚀**
