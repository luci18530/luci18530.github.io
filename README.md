# Portfólio Pessoal

Site de portfólio pessoal moderno e responsivo desenvolvido com HTML, CSS e JavaScript puro.

## 🎨 Características

- **Design Moderno**: Interface limpa com tema escuro e destaques em tons de laranja
- **Responsivo**: Adaptado para todos os dispositivos (desktop, tablet e mobile)
- **Menu Fixo**: Navegação sempre acessível no topo da página
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Seções Completas**:
  - 🏠 Hero/Início - Apresentação impactante
  - 👤 Sobre mim - Informações pessoais e profissionais
  - 💼 Projetos - Portfólio com cards e links para GitHub
  - 🛠️ Habilidades - Tecnologias e competências
  - 📧 Contato - Formulário e informações de contato

## 🚀 Como Usar

### Visualizar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/luci18530/luci18530.github.io.git
```

2. Abra o arquivo `index.html` no seu navegador ou use um servidor local:
```bash
# Com Python 3
python3 -m http.server 8000

# Com Node.js (http-server)
npx http-server
```

3. Acesse `http://localhost:8000` no navegador

### Personalizar o Conteúdo

#### 1. Informações Pessoais
Edite o arquivo `index.html` e substitua os seguintes textos de exemplo:
- `Seu Nome` - Seu nome completo
- `seuemail@exemplo.com` - Seu email
- `+55 (11) 99999-9999` - Seu telefone
- `São Paulo, Brasil` - Sua localização
- Textos das descrições nas seções

#### 2. Links das Redes Sociais
Atualize os links no arquivo `index.html`:
- GitHub: `https://github.com/seuusuario`
- LinkedIn: `https://linkedin.com/in/seuusuario`
- Twitter: `https://twitter.com/seuusuario`
- Instagram: `https://instagram.com/seuusuario`

#### 3. Projetos
Edite os cards de projetos no arquivo `index.html`:
- Altere títulos, descrições e tecnologias
- Atualize os links do GitHub
- Adicione suas próprias imagens em `assets/`

#### 4. Habilidades
Ajuste as barras de progresso no arquivo `index.html`:
- Modifique os percentuais: `style="width: 95%"`
- Adicione ou remova habilidades conforme necessário

#### 5. Imagens
Adicione seus arquivos na pasta `assets/`:
- `profile.jpg` - Sua foto de perfil (400x400px recomendado)
- `project1.jpg` a `project4.jpg` - Screenshots dos projetos (600x400px)
- `curriculo.pdf` - Seu currículo em PDF

## 🎨 Personalização de Cores

Para alterar o esquema de cores, edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #ff6b35;      /* Laranja principal */
    --primary-dark: #d94e23;       /* Laranja escuro */
    --primary-light: #ff8c61;      /* Laranja claro */
    --secondary-color: #ff9f1c;    /* Laranja secundário */
    --accent-color: #ffb347;       /* Cor de destaque */
}
```

## 📱 Funcionalidades

- **Navegação Suave**: Scroll suave entre seções
- **Menu Responsivo**: Menu hambúrguer para dispositivos móveis
- **Animações**: Elementos aparecem conforme você rola a página
- **Formulário de Contato**: Integrado com cliente de email
- **Botão Voltar ao Topo**: Aparece ao rolar a página
- **Efeitos Hover**: Interações visuais nos elementos

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Animações)
- JavaScript (Vanilla)
- Font Awesome (ícones)

## 📄 Estrutura do Projeto

```
luci18530.github.io/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── assets/             # Imagens e arquivos
│   ├── README.md       # Instruções para adicionar assets
│   ├── profile.jpg     # Foto de perfil
│   ├── project1-4.jpg  # Screenshots de projetos
│   └── curriculo.pdf   # Currículo em PDF
└── README.md           # Este arquivo
```

## 🌐 Deploy

Este site está pronto para ser hospedado no GitHub Pages:

1. O repositório já está configurado para GitHub Pages
2. As alterações são publicadas automaticamente
3. Acesse em: `https://luci18530.github.io`

## 📝 Licença

Este projeto é de código aberto e está disponível para uso pessoal e comercial.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ e muito café**