// LOGIC: Simple loading spinner shown while API calls are in progress

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 20px',
        gap: '16px',
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid #e2e8f0',
        borderTopColor: '#4f46e5',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      <p style={{
        margin: 0,
        fontSize: '14px',
        color: '#94a3b8',
        fontWeight: '500',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        Loading products...
      </p>
    </div>
  )
}

export default Loader
