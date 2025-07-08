# 🦊 FoxTalk

Uma plataforma de comunicação moderna com autenticação completa, desenvolvida em React, Node.js e PostgreSQL.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **CSS3** - Estilização moderna e responsiva
- **HTML5** - Estrutura semântica
- **Favicon personalizado** - Raposa 🦊
- **Título da aba:** FoxTalk

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **bcrypt** - Criptografia de senhas
- **JWT** - Autenticação por tokens
- **CORS** - Cross-Origin Resource Sharing (aceita conexões externas)

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 📁 Estrutura do Projeto

```
foxtalk/
├── frontend/                 # Aplicação React
│   ├── public/              # Arquivos públicos
│   │   ├── index.html       # HTML principal (título e favicon)
│   │   ├── favicon.ico      # Favicon personalizado (raposa)
│   │   └── manifest.json    # Configuração PWA
│   ├── src/                 # Código fonte
│   │   ├── App.js           # Componente principal (login, registro, feed)
│   │   └── App.css          # Estilos do App
│   ├── package.json         # Dependências do frontend
│   └── Dockerfile           # Configuração Docker
├── backend/                  # API Node.js/Express
│   ├── server.js            # Servidor principal
│   ├── package.json         # Dependências do backend
│   ├── env.example          # Exemplo de variáveis de ambiente
│   └── Dockerfile           # Configuração Docker
├── docker-compose.yml       # Orquestração dos containers
└── README.md               # Este arquivo
```

## 🎨 Design

O projeto utiliza uma paleta de cores moderna e elegante:
- **Roxo Principal**: `#8B5CF6`
- **Amarelo Acento**: `#F59E0B`
- **Fundo**: `#f9f9fb`
- **Texto**: `#333333`

## 🔧 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)

### Execução com Docker (Recomendado)

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd foxtalk
   ```

2. **Execute o projeto:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse as aplicações:**
   - **Frontend**: http://localhost:3000
   - **Backend**: http://localhost:5000
   - **Teste da API**: http://localhost:5000/test

### Execução Local (Desenvolvimento)

1. **Backend:**
   ```bash
   cd backend
   npm install
   cp env.example .env
   npm run dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Banco de Dados:**
   ```bash
   # Instale o PostgreSQL localmente ou use Docker
   docker run --name foxtalk-postgres -e POSTGRES_DB=foxtalk -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
   ```

## 📱 Acesso pelo Celular ou Outro Dispositivo

- **Acesse pelo IP local do seu computador:**
  - Exemplo: `http://192.168.15.9:3000`
  - O backend já aceita conexões externas
  - Ambos os dispositivos precisam estar na mesma rede Wi-Fi

- **Acesso por nome personalizado (opcional):**
  - Edite o arquivo `hosts` do seu computador e adicione:
    ```
    192.168.15.9    foxtalk.local
    ```
  - Assim, pode acessar por `http://foxtalk.local:3000` no PC
  - No celular, normalmente só é possível via IP, a não ser que use app de DNS local

## 📡 Endpoints da API

### Autenticação

#### POST `/login`
- **Descrição**: Autenticação de usuário
- **Body**: `{ "user": "email@exemplo.com", "password": "senha123" }`
- **Resposta**: Token JWT e dados do usuário

#### POST `/register`
- **Descrição**: Criação de nova conta
- **Body**: `{ "email": "email@exemplo.com", "username": "usuario", "password": "senha123" }`
- **Resposta**: Token JWT e dados do usuário criado

#### POST `/forgot-password`
- **Descrição**: Iniciar recuperação de senha
- **Body**: `{ "email": "email@exemplo.com" }`
- **Resposta**: Confirmação de envio

#### GET `/test`
- **Descrição**: Teste de conectividade
- **Resposta**: `{ "message": "Backend FoxTalk funcionando!" }`

## 🗄️ Banco de Dados

### Tabela `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Segurança

- **Senhas**: Criptografadas com bcrypt (salt rounds: 10)
- **Autenticação**: JWT tokens com expiração de 24h
- **CORS**: Configurado para permitir comunicação frontend-backend e acesso externo
- **Validação**: Todos os endpoints validam dados de entrada

## 🐳 Comandos Docker Úteis

```bash
# Iniciar todos os serviços
docker-compose up

# Iniciar em background
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Reconstruir containers
docker-compose up --build

# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend

# Acessar container
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres -d foxtalk
```

## 🚀 Funcionalidades

### ✅ Implementadas
- [x] Tela de login responsiva
- [x] Autenticação com JWT
- [x] Registro de usuários
- [x] Criptografia de senhas
- [x] Validação de dados
- [x] Containerização com Docker
- [x] Banco de dados PostgreSQL
- [x] API RESTful
- [x] Favicon e título personalizados
- [x] Acesso mobile via IP local
- [x] Backend aceitando conexões externas

### 🔄 Próximas Funcionalidades
- [ ] Recuperação de senha por email
- [ ] Dashboard do usuário
- [ ] Chat em tempo real
- [ ] Upload de arquivos
- [ ] Notificações push

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se encontrar algum problema ou tiver dúvidas:

1. Verifique se todos os serviços estão rodando: `docker-compose ps`
2. Verifique os logs: `docker-compose logs`
3. Teste a API: `curl http://localhost:5000/test`
4. Abra uma issue no repositório

---

**Desenvolvido com ❤️ para a FoxTalk** 