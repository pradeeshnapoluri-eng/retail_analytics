const themes = {
  green:  { border:'rgba(0,255,128,0.25)',  glow:'rgba(0,255,128,0.08)',  text:'#00ff80', bar:'#00ff80',  label:'#00ff8066'  },
  cyan:   { border:'rgba(0,229,255,0.25)',  glow:'rgba(0,229,255,0.08)',  text:'#00e5ff', bar:'#00e5ff',  label:'#00e5ff66'  },
  yellow: { border:'rgba(255,215,0,0.25)',  glow:'rgba(255,215,0,0.08)',  text:'#ffd700', bar:'#ffd700',  label:'#ffd70066'  },
  red:    { border:'rgba(255,68,68,0.25)',  glow:'rgba(255,68,68,0.08)',  text:'#ff4444', bar:'#ff4444',  label:'#ff444466'  },
  white:  { border:'rgba(255,255,255,0.1)', glow:'rgba(255,255,255,0.04)',text:'#ffffff', bar:'#ffffff',  label:'#ffffff44'  },
  indigo: { border:'rgba(0,255,128,0.25)',  glow:'rgba(0,255,128,0.08)',  text:'#00ff80', bar:'#00ff80',  label:'#00ff8066'  },
  blue:   { border:'rgba(0,229,255,0.25)',  glow:'rgba(0,229,255,0.08)',  text:'#00e5ff', bar:'#00e5ff',  label:'#00e5ff66'  },
  purple: { border:'rgba(255,215,0,0.25)',  glow:'rgba(255,215,0,0.08)',  text:'#ffd700', bar:'#ffd700',  label:'#ffd70066'  },
}

export default function KPICard({ title, value, icon, color = 'green', trend, subtitle }) {
  const t = themes[color] || themes.green
  return (
    <div className="fade-up" style={{
      background: '#000',
      border: `1px solid ${t.border}`,
      borderRadius: '4px', padding: '20px',
      boxShadow: `0 0 24px ${t.glow}`,
      position: 'relative', overflow: 'hidden',
      cursor: 'default',
      transition: 'all 0.2s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 40px ${t.glow}, 0 0 0 1px ${t.border}`
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 0 24px ${t.glow}`
        e.currentTarget.style.transform = 'translateY(0)'
      }}>

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${t.bar}, transparent)`
      }} />

      {/* Corner bracket TL */}
      <div style={{ position:'absolute', top:'8px', left:'8px', width:'10px', height:'10px',
        borderTop:`1px solid ${t.bar}`, borderLeft:`1px solid ${t.bar}`, opacity:0.5 }} />
      {/* Corner bracket BR */}
      <div style={{ position:'absolute', bottom:'8px', right:'8px', width:'10px', height:'10px',
        borderBottom:`1px solid ${t.bar}`, borderRight:`1px solid ${t.bar}`, opacity:0.5 }} />

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px' }}>
        <p style={{ fontSize:'9px', fontWeight:'800', textTransform:'uppercase',
          letterSpacing:'0.18em', color: t.label }}>{title}</p>
        {icon && <span style={{ fontSize:'16px', opacity: 0.8 }}>{icon}</span>}
      </div>

      <p style={{ fontSize:'24px', fontWeight:'900', color: t.text,
        letterSpacing:'-0.5px', fontVariantNumeric:'tabular-nums',
        textShadow: `0 0 20px ${t.bar}66` }}>{value}</p>

      {subtitle && <p style={{ fontSize:'10px', color:'#1a3a2a', marginTop:'4px', letterSpacing:'0.04em' }}>{subtitle}</p>}

      {trend !== undefined && (
        <div style={{ marginTop:'14px', height:'2px', background:'#0a0a0a', borderRadius:'99px', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${Math.min(trend,100)}%`,
            background:`linear-gradient(90deg, ${t.bar}88, ${t.bar})`,
            borderRadius:'99px', transition:'width 1.2s ease' }} />
        </div>
      )}
    </div>
  )
}