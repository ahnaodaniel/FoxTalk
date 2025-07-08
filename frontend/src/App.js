import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  // Função para obter o IP do backend
  const getBackendUrl = () => {
    // Se estiver no celular, use o IP do computador
    if (window.location.hostname !== 'localhost') {
      // Substitua pelo IP do seu computador
      return 'http://192.168.15.9:5000'; // IP do seu computador
    }
    return 'http://localhost:5000';
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const backendUrl = getBackendUrl();
      
      if (isLogin) {
        // Login - pode usar email ou username
        const response = await fetch(`${backendUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: formData.email, // Pode ser email ou username
            password: formData.password
          })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
        } else {
          const error = await response.json();
          alert(error.message || 'Erro no login');
        }
      } else {
        // Registro
        if (formData.password !== formData.confirmPassword) {
          alert('As senhas não coincidem!');
          setLoading(false);
          return;
        }

        if (!formData.username.trim()) {
          alert('Nome de usuário é obrigatório!');
          setLoading(false);
          return;
        }

        const response = await fetch(`${backendUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password
          })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
        } else {
          const error = await response.json();
          alert(error.message || 'Erro no registro');
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setFormData({ email: '', username: '', password: '', confirmPassword: '' });
  };

  // Tela de Feed
  if (isLoggedIn) {
    return (
      <div className="App">
        <div className="feed-container">
          <div className="fox-logo">
            <span className="fox-emoji">🦊</span>
          </div>
          
          <h1 className="title">FoxTalk</h1>
          <p className="subtitle">Bem-vindo ao seu feed!</p>

          <div className="feed-box">
            <h2>🐾 Feed do FoxTalk</h2>
            <p>Aqui você verá todas as conversas e posts da comunidade FoxTalk.</p>
            <p>Em breve: mensagens, fotos e muito mais!</p>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>
      </div>
    );
  }

  // Tela de Login/Registro
  return (
    <div className="App">
      <div className="login-container">
        <div className="fox-logo">
          <span className="fox-emoji">🦊</span>
        </div>
        
        <h1 className="title">FoxTalk</h1>
        <p className="subtitle">Conecte-se com o mundo</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type={isLogin ? "text" : "email"}
              name="email"
              placeholder={isLogin ? "Email ou usuário" : "Email"}
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Nome de usuário"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>
        </form>

        <div className="links">
          {isLogin ? (
            <>
              <a href="#" className="link">Esqueci a senha</a>
              <a 
                href="#" 
                className="link" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                  setFormData({ email: '', username: '', password: '', confirmPassword: '' });
                }}
              >
                Criar nova conta
              </a>
            </>
          ) : (
            <a 
              href="#" 
              className="link" 
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(true);
                setFormData({ email: '', username: '', password: '', confirmPassword: '' });
              }}
            >
              Já tenho uma conta
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
