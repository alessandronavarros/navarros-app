import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Se já estiver logado, vai direto pro dashboard
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Erro ao entrar. Verifique os dados.');
    } else {
      router.replace('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Erro ao entrar com Google.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-mark">NC</div>
          <div className="login-logo-texts">
            <div className="login-logo-main">Navarros Consultoria</div>
            <div className="login-logo-sub">BPO financeiro & business</div>
          </div>
        </div>

        <div>
          <div className="login-title">Bem-vindo ao painel Navarros</div>
          <div className="login-subtitle">
            Acesse com sua conta cadastrada ou com o seu Google.
          </div>
        </div>

        <form className="login-form" onSubmit={handleEmailLogin}>
          <div>
            <label className="input-label">E-mail</label>
            <input
              type="email"
              className="input-field"
              placeholder="voce@navarrosconsultoria.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Senha</label>
            <input
              type="password"
              className="input-field"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div className="login-error">{errorMessage}</div>
          )}

          <div className="login-buttons">
            <button className="button-primary" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar com e-mail e senha'}
            </button>

            <button
              type="button"
              className="button-ghost"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Entrar com Google
            </button>
          </div>
        </form>

        <div className="login-footer">
          Navarros Consultoria · Programa De Volta à Renda
        </div>
      </div>
    </div>
  );
}
