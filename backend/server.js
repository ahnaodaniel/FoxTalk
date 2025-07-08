const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.15.9:3000'],
  credentials: true
}));
app.use(express.json());

// Configuração do PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'foxtalk',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'foxtalk-secret-key';

// Criar tabela users se não existir
const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabela users criada/verificada com sucesso');
  } catch (error) {
    console.error('Erro ao criar tabela users:', error);
  }
};

// Endpoint de login
app.post('/login', async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    }

    // Buscar usuário por email ou username
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $1',
      [user]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const userData = result.rows[0];

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, userData.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    // Gerar JWT token
    const token = jwt.sign(
      { userId: userData.id, email: userData.email, username: userData.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: userData.id,
        email: userData.email,
        username: userData.username
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Endpoint de registro
app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, usuário e senha são obrigatórios' });
    }

    // Verificar se email já existe
    const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Verificar se username já existe
    const usernameCheck = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Nome de usuário já existe' });
    }

    // Criptografar senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Inserir novo usuário
    const result = await pool.query(
      'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, email, username',
      [email, username, hashedPassword]
    );

    const newUser = result.rows[0];

    // Gerar JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Endpoint de esqueci a senha
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório' });
    }

    // Verificar se email existe
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email não encontrado' });
    }

    // Aqui você implementaria o envio de email com link de recuperação
    // Por enquanto, apenas retornamos sucesso
    res.json({ 
      message: 'Se o email existir em nossa base, você receberá instruções de recuperação' 
    });

  } catch (error) {
    console.error('Erro no forgot-password:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Endpoint de teste
app.get('/test', (req, res) => {
  res.json({ message: 'Backend FoxTalk funcionando!' });
});

// Inicializar servidor
const startServer = async () => {
  try {
    await createUsersTable();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Teste: http://localhost:${PORT}/test`);
      console.log('Aceitando conexões externas (celular)');
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
};

startServer(); 