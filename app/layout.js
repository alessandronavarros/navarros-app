import '../styles/globals.css';

export const metadata = {
  title: 'Navarros Consultoria - App',
  description: 'Painel Navarros Consultoria',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          backgroundColor: '#0b0c10',
          color: '#f5f5f5',
        }}
      >
        <header
          style={{
            padding: '16px 32px',
            borderBottom: '1px solid #1f2833',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: '2px solid #45a29e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div>
            <div style={{ fontWeight: 700, letterSpacing: '0.08em' }}>NAVARROS CONSULTORIA</div>
            <div style={{ fontSize: 12, color: '#c5c6c7' }}>Painel de Gestão</div>
          </div>
        </header>

        <main style={{ padding: '24px 32px', minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
