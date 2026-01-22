# 🚀 WebFusionLab - Website Institucional

Um website moderno e profissional para a empresa WebFusionLab, desenvolvido com **Next.js 15**, **TypeScript**, **TailwindCSS** e **Framer Motion**.

## 🎨 Características

- ✨ **Design Moderno e Minimalista**: Dark mode com tema tech elegante
- 🎯 **Responsivo**: Mobile-first, funciona perfeitamente em todos os dispositivos
- ⚡ **Performance Otimizada**: Static generation, lazy loading, otimização de imagens
- 🎬 **Animações Suaves**: Transições elegantes com Framer Motion
- 🤖 **AI-Ready**: Menções a inteligência artificial de forma prática e integrada
- 📱 **SEO Otimizado**: Metadata dinâmica, títulos, descrições
- ♿ **Acessibilidade**: Labels, focus states, aria attributes
- 💬 **Formulário de Contacto**: Validação client-side, API route backend

## 📁 Estrutura do Projeto

```
frontend/
├── app/                      # App Router do Next.js
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Home
│   ├── globals.css           # Estilos globais
│   ├── api/
│   │   └── contact/route.ts  # API de contacto
│   ├── services/
│   │   ├── layout.tsx        # Layout da página
│   │   └── page.tsx          # Página de serviços
│   ├── projects/
│   │   ├── layout.tsx        # Layout da página
│   │   └── page.tsx          # Página de projetos com filtros
│   └── contact/
│       ├── layout.tsx        # Layout da página
│       └── page.tsx          # Página de contacto
├── components/               # Componentes React reutilizáveis
│   ├── Navbar.tsx           # Barra de navegação fixa
│   ├── Footer.tsx           # Rodapé
│   ├── ui/                  # Componentes base de UI
│   │   ├── Button.tsx       # Botões e variantes
│   │   ├── Card.tsx         # Cards e layouts
│   │   ├── Badge.tsx        # Badges e tags
│   │   └── SectionHeading.tsx # Títulos de secção
│   ├── sections/            # Blocos reutilizáveis
│   │   ├── AnimatedSection.tsx # Animação ao scroll
│   │   ├── ProjectCard.tsx  # Card de projeto
│   │   ├── ServiceCard.tsx  # Card de serviço
│   │   └── ProcessStep.tsx  # Passo do processo
│   ├── FadeIn.tsx           # Fade in effect
│   └── StaggerContainer.tsx # Container com stagger
├── data/                     # Dados estáticos
│   ├── services.ts          # Dados de serviços
│   ├── projects.ts          # Dados de projetos
│   └── testimonials.ts      # Dados de testemunhos
├── lib/                      # Utilitários e configurações
│   ├── animations.ts        # Variantes de animações
│   └── utils.ts             # Funções utilitárias
└── package.json
```

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Styling**: TailwindCSS
- **Animações**: Framer Motion
- **Fontes**: Inter (Google Fonts)
- **Package Manager**: npm

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ ou superior
- npm ou yarn

### Passos

1. **Navega até a pasta do projeto:**

```bash
cd frontend
```

2. **Instala as dependências:**

```bash
npm install
```

3. **Inicia o servidor de desenvolvimento:**

```bash
npm run dev
```

4. **Abre o navegador:**

```
http://localhost:3000
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                # Inicia servidor em modo desenvolvimento

# Build e Produção
npm run build             # Cria build para produção
npm run start             # Inicia servidor de produção
npm run lint             # Executa linter
```

## 🎯 Páginas Disponíveis

### 1. **Home** (`/`)

- Hero com headline e CTA
- Secção de serviços (6 serviços em cards)
- Secção AI na prática (delivery, QA, automação)
- Projetos em destaque (3 projetos)
- Processo com 4 passos
- CTA final para contacto

### 2. **Serviços** (`/services`)

- Lista completa de 6 serviços
- Detalhes de cada serviço com features
- Processo de trabalho (4 etapas)
- Stack de tecnologias
- CTA para iniciar projeto

### 3. **Projetos** (`/projects`)

- Grid de 3 projetos
- Filtro por categoria (Todos, Web, Mobile, Marketing, AI)
- Animações ao filtrar
- Info de cada projeto (stack, categoria, ano)

### 4. **Contacto** (`/contact`)

- Formulário com validação
- Campos: nome, email, assunto, mensagem
- Estados: loading, sucesso, erro
- Informações de contacto
- Links de redes sociais

## 🎨 Customização

### Alterar Cores

Edita as cores no arquivo `app/globals.css`:

```css
:root {
  --background: #0b0f19; /* Fundo escuro */
  --foreground: #e4e7eb; /* Texto claro */
  --primary: #3b82f6; /* Azul primário */
}
```

### Alterar Conteúdo

- **Serviços**: Edita `data/services.ts`
- **Projetos**: Edita `data/projects.ts`

## 🔧 API de Contacto

A rota `POST /api/contact` aceita:

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "subject": "Assunto",
  "message": "Mensagem aqui..."
}
```

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎬 Animações

As animações incluem:

- Fade in ao scroll
- Stagger em listas
- Scale no hover
- Slide in em direções diferentes

## 🚢 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Outras Plataformas

Suporta deployment em: Netlify, AWS Amplify, DigitalOcean, Docker, entre outros.

## 🐛 Troubleshooting

### Porta 3000 em uso

```bash
npm run dev -- -p 3001
```

### Cache do Next.js

```bash
rm -rf .next
npm run dev
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 📄 Licença

© 2024 WebFusionLab. Todos os direitos reservados.

---

Desenvolvido com ❤️ pela WebFusionLab
