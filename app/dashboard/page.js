'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push('/');
        return;
      }
      setUserEmail(data.session.user.email);
    }

    loadSession();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Dashboard Navarros</h1>
          <p style={{ margin: '4px 0', color: '#c5c6c7', fontSize: 13 }}>
            Visão geral dos programas e atendimentos.
          </p>
          {userEmail && (
            <p style={{ margin: 0, color: '#66fcf1', fontSize: 12 }}>
              Usuário conectado: {userEmail}
            </p>
          )}
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #45a29e',
            backgroundColor: '#0b0c10',
            color: '#f5f5f5',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          Sair
        </button>
      </div>

      {/* Cards de KPIs simples – depois podemos ligar nas views do Supabase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <KpiCard titulo="Atingidos cadastrados" valor="—" subtitulo="Ligaremos na view v_kpis" />
        <KpiCard titulo="Visitas realizadas" valor="—" subtitulo="Dados da tabela visitas" />
        <KpiCard titulo="Programas ativos" valor="—" subtitulo="Programas em execução" />
        <KpiCard titulo="Empreendimentos acompanhados" valor="—" subtitulo="Resumo geral" />
      </div>

      <div
        style={{
          backgroundColor: '#1f2833',
          borderRadius: 16,
          padding: 16,
          minHeight: 160,
          border: '1px solid #45a29e22',
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 18 }}>Próximos passos</h2>
        <ul style={{ marginTop: 4, color: '#c5c6c7', fontSize: 14 }}>
          <li>Conectar estes cards às views do Supabase (v_kpis, v_atingidos_listagem, etc.).</li>
          <li>Criar telas de listagem para Atingidos, Visitas, Programas, Despesas.</li>
          <li>Refinar o layout do dashboard no estilo do modelo 3 que você me mostrou.</li>
        </ul>
      </div>
    </div>
  );
}

function KpiCard({ titulo, valor, subtitulo }) {
  return (
    <div
      style={{
        backgroundColor: '#1f2833',
        borderRadius: 16,
        padding: 16,
        border: '1px solid #45a29e22',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ fontSize: 13, color: '#c5c6c7' }}>{titulo}</div>
      <div style={{ fontSize: 26, fontWeight: 700 }}>{valor}</div>
      <div style={{ fontSize: 11, color: '#7f8c8d' }}>{subtitulo}</div>
    </div>
  );
}
