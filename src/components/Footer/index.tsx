import useWindowSize from '../../hooks/useWindowSize'

const Footer = () => {
  const { width } = useWindowSize()
  const isMobile = width < 640

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#f1f5f9',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        width: '100%',
        padding: isMobile ? '24px 16px' : '28px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px', height: '26px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px',
          }}>🛍</div>
          <span style={{ fontSize: '16px', fontWeight: '800', color: '#fff', letterSpacing: '-0.3px' }}>
            ApnaBazaar
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
          © 2025 ApnaBazaar. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
