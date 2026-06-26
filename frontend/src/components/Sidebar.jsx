import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, TrendingUp, Users,
  Package, Warehouse, LineChart
} from 'lucide-react'

const links = [
  { to: '/',          icon: LayoutDashboard, label: 'DASHBOARD',  badge: null   },
  { to: '/sales',     icon: TrendingUp,      label: 'SALES',      badge: 'LIVE' },
  { to: '/customers', icon: Users,           label: 'CUSTOMERS',  badge: null   },
  { to: '/products',  icon: Package,         label: 'PRODUCTS',   badge: null   },
  { to: '/inventory', icon: Warehouse,       label: 'INVENTORY',  badge: null   },
  { to: '/forecast',  icon: LineChart,       label: 'FORECAST',   badge: 'AI'   },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '210px', minHeight: '100vh', flexShrink: 0,
      background: '#000',
      borderRight: '1px solid rgba(0,255,128,0.1)',
      display: 'flex', flexDirection: 'column',
      padding: '20px 12px',
      position: 'sticky', top: 0,
    }}>

      {/* Logo */}
      <div style={{ padding: '8px 10px', marginBottom: '32px' }}>
        <div style={{
          fontSize: '22px', fontWeight: '900',
          letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #00ff80, #00e5ff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>RETAILIQ</div>
        <div style={{
          fontSize: '9px', color: '#1a3a2a', letterSpacing: '0.25em',
          textTransform: 'uppercase', marginTop: '3px', fontWeight: '600'
        }}>ANALYTICS TERMINAL v2.0</div>
        <div style={{
          marginTop: '10px', height: '1px',
          background: 'linear-gradient(90deg, #00ff80, transparent)'
        }} />
      </div>

      {/* Section label */}
      <div style={{
        fontSize: '9px', fontWeight: '700', letterSpacing: '0.2em',
        color: '#00ff8044', marginBottom: '8px', padding: '0 10px'
      }}>NAVIGATION</div>

      {/* Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {links.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to} end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 12px', borderRadius: '3px',
              fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em',
              textDecoration: 'none', transition: 'all 0.15s ease',
              background: isActive ? 'rgba(0,255,128,0.08)' : 'transparent',
              color: isActive ? '#00ff80' : '#2d3748',
              borderLeft: isActive ? '2px solid #00ff80' : '2px solid transparent',
              paddingLeft: isActive ? '10px' : '12px',
            })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon size={14} />
              {label}
            </div>
            {badge && (
              <span style={{
                fontSize: '8px', fontWeight: '800', padding: '2px 5px',
                background: 'rgba(0,255,128,0.1)', color: '#00ff80',
                border: '1px solid rgba(0,255,128,0.2)', borderRadius: '2px',
                letterSpacing: '0.08em'
              }}>{badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Status */}
      <div style={{
        marginTop: '20px', padding: '12px 14px', borderRadius: '3px',
        background: 'rgba(0,255,128,0.03)',
        border: '1px solid rgba(0,255,128,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="pulse-dot" />
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#00ff80', letterSpacing: '0.08em' }}>SYSTEM ONLINE</span>
        </div>
        <div style={{ fontSize: '9px', color: '#1a3a2a', letterSpacing: '0.05em' }}>ALL APIS RESPONDING</div>
        <div style={{ marginTop: '8px', height: '2px', background: '#0a0a0a', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '92%', background: 'linear-gradient(90deg,#00ff80,#00cc66)', borderRadius: '99px' }} />
        </div>
      </div>
    </aside>
  )
}