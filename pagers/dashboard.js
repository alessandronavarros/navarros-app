import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function DashboardPage() {
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [totalAtingidos, setTotalAtingidos] = useState(0);
  const [totalVisitas, setTotalVisitas] = useState(0);
  const [totalEmpresas, setTotalEmpresas] = useState(0);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace('/');
        return;
      }

      setSessionUser(data.session.user);
      await loadKpis();
      setLoading(false);
    };

    init();
  }, [router]);

  const loadKpis = async () => {
    // total de atingidos
    const { count: atingidosCount } = await supabase
      .from('atingidos')
      .select('*', { count: 'exact', head: true });

    // total de visitas
    const { count: visitasCount } = await supabase
      .from('visitas')
      .select('*', { count: 'exact', head: true });

    // total de empresas
    const { count: empresasCount } = await supabase
      .from('empresas')
      .select('*', { count: 'exact', head: true });

    setTotalAtingidos(atingidosCount || 0);
    setTotalVisitas(visitasCount || 0);
    setTotalEmpresas(empresasCount || 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  const initials =
    sessionUser?.email
      ?.split('@')[0]
      ?.split('.')
      ?.map((p) => p[0]?.toUpperCase())
      .join('') || 'NC';

  if (loading) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-title">Carregando painel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">NC</div>
          <div>
            <div className="sidebar-logo-text-main">Navarros</div>
            <div className="sidebar-logo-text-sub">Consultoria</div>
          </div>
        </div>

        <div className="sidebar-nav">
          <div>
            <div className="sidebar-nav-section-title">Geral</div>
            <div className="sidebar-nav-item active">
              <span>Dashboard</span>
              <span>●</span>
            </div>
          </div>

          <div>
            <div className="sidebar-nav-section-title">Cadastros</div>
            <div className="sidebar-nav-item">
              <span>Atingidos</span>
            </div>
            <div className="sidebar-nav-item">
              <span>Visitas</span>
            </div>
            <div className="sidebar-nav-item">
              <span>Empresas</span>
            </div>
            <div className="sidebar-nav-item">
              <span>Despesas</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div className="sidebar-nav-section-title">Conta</div>
            <div className="sidebar-nav-item" onClick={handleLogout}>
              <span>Sair</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-title-block">
            <div className="topbar-title">Painel de Indicadores</div>
            <div className="topbar-subtitle">
              Visão consolidada dos programas socioeconômicos – Navarros &amp; Florestas.
            </div>
          </div>

          <div className="topbar-user">
            <button className="button-small" onClick={loadKpis}>
              Atualizar
            </button>
            <div className="topbar-user-info">
              <div className="topbar-user-name">
                {sessionUser?.email || 'Usuário'}
              </div>
              <div className="topbar-user-role">Consultoria & BPO</div>
            </div>
            <div className="topbar-user-initials">{initials}</div>
          </div>
        </header>

        {/* KPIs */}
        <section className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Atingidos na base</div>
            <div className="kpi-value">{totalAtingidos}</div>
            <div className="kpi-footer">Registros na tabela &quot;atingidos&quot;</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Visitas realizadas</div>
            <div className="kpi-value">{totalVisitas}</div>
            <div className="kpi-footer">Total de registros em &quot;visitas&quot;</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Empresas atendidas</div>
            <div className="kpi-value">{totalEmpresas}</div>
            <div className="kpi-footer">Clientes cadastrados em &quot;empresas&quot;</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Status geral</div>
            <div className="kpi-value">
              {totalAtingidos + totalVisitas + totalEmpresas > 0
                ? 'Em operação'
                : 'Em implantação'}
            </div>
            <div className="kpi-footer">Resumo automático do movimento</div>
          </div>
        </section>

        {/* Linhas inferiores – espaço para relatórios futuros */}
        <section className="dashboard-grid">
          <div className="card-panel">
            <div className="card-panel-header">
              <div>
                <div className="card-panel-title">Resumo operacional</div>
                <div className="card-panel-subtitle">
                  Espaço reservado para gráficos por município, origem do dano, segmento etc.
                </div>
              </div>
            </div>

            <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>
              Aqui, em uma próxima etapa, vamos colocar:
            </p>
            <ul style={{ fontSize: 12, color: '#d1d5db', marginLeft: 16, marginTop: 4 }}>
              <li>• Gráfico de barras por programa (De Volta à Renda, Retomada Produtiva...)</li>
              <li>• Distribuição dos atingidos por município e origem do dano</li>
              <li>• Evolução das visitas ao longo dos meses</li>
            </ul>
          </div>

          <div className="card-panel">
            <div className="card-panel-header">
              <div>
                <div className="card-panel-title">Últimos registros (exemplo)</div>
                <div className="card-panel-subtitle">
                  Nesta coluna poderemos listar últimas visitas, empresas com pendências, etc.
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Indicador</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Implantação Supabase</td>
                  <td>Banco configurado com segurança e estrutura Navarros.</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>App Next.js</td>
                  <td>Front-end integrado, pronto para evoluir dashboards.</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Login unificado</td>
                  <td>Acesso via e-mail/senha e Google (OAuth).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

