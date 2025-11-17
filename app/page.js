'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  // Se já estiver logado, manda para o dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        router.push('/dashboard');
      }
    });
  }, [router]);

  async function handleLoginEmail(e) {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setMensagem('Erro ao enviar link de login. Confira o e-mail.');
    } else {
      setMensagem('Enviamos um link de acesso para o seu e-mail.');
    }
  }

  async function handleLoginGoogle() {
    setLoading(true);
    setMensagem('');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setMensagem('Erro ao entrar com Google. Verifique a configuração do OAuth no Supabase.');
    }
  }

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '0 auto',
        backgroundColor: '#1f2833',
        padding: 24,
        borderRadius: 16,
        boxShadow: '0 18px 45px rgba(0,0,0,0.45)',
      }}
    >
      <h1 style={{ marginTop: 0, marginBottom: 8 }}>Bem-vindo ao App Navarros</h1>
      <p style={{ marginTop: 0, marginBottom: 24, color: '#c5c6c7' }}>
        Acesse com seu e-mail corporativo ou conta Google.
      </p>

      <form onSubmit={handleLoginEmail} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontSize: 14 }}>
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@navarrosconsultoria.com.br"
            style={{
              marginTop: 4,
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #45a29e44',
              backgroundColor: '#0b0c10',
              color: '#f5f5f5',
            }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 4,
            padding: '10px 12px',
            borderRadius: 8,
            border: 'none',
            background: loading ? '#45a29e88' : '#45a29e',
            color: '#0b0c10',
            fontWeight: 600,
            cursor: loading ? 'default' : 'pointer',
          }}
        >
          {loading ? 'Enviando link…' : 'Entrar com link por e-mail'}
        </button>
      </form>

      <div style={{ margin: '16px 0', textAlign: 'center', color: '#c5c6c7', fontSize: 12 }}>
        — ou —
      </div>

      <button
        onClick={handleLoginGoogle}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #ffffff33',
          backgroundColor: '#0b0c10',
          color: '#f5f5f5',
          cursor: loading ? 'default' : 'pointer',
        }}
      >
        Entrar com Google
      </button>

      {mensagem && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#c5c6c7' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}
