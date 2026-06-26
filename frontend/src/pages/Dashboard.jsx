import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

export default function Dashboard() {
  const [kpi, setKpi]       = useState(null)
  const [trend, setTrend]   = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axiosClient.get('/dashboard/kpi').then(r => setKpi(r.data)).catch(() => {})
    axiosClient.get('/dashboard/profit-trend').then(r => {
      const cleaned = r.data.map(d => ({
        ...d,
        month: d.month?.substring(0, 7)
      }))
      setTrend(cleaned)
    }).catch(() => {})
    axiosClient.get('/dashboard/recent-orders').then(r => setOrders(r.data)).catch(() => {})
  }, [])

  const fmt = (v) => `₹${Number(v).toLocaleString('en-IN')}`

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>📊 Dashboard Overview</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Welcome back — here's your retail performance</p>
        </div>
        <button
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
          onClick={() => window.print()}>
          ⬇️ Export
        </button>
      </div>

      {/* KPI Cards */}
      {kpi && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Sales',    value: fmt(kpi.total_sales),   color: '#6366f1', bg: 'rgba(99,102,241,0.12)'  },
            { label: 'Total Profit',   value: fmt(kpi.total_profit),  color: '#10b981', bg: 'rgba(16,185,129,0.12)'  },
            { label: 'Orders',         value: kpi.total_orders,       color: '#3b82f6', bg: 'rgba(59,130,246,0.12)'  },
            { label: 'Customers',      value: kpi.total_customers,    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)'  },
            { label: 'Profit Margin',  value: `${kpi.profit_margin_pct}%`, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
          ].map((k, i) => (
            <div key={i} style={{ background: k.bg, border: `1px solid ${k.color}44`, borderRadius: '16px', padding: '20px', transition: 'transform 0.2s', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <p style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', fontWeight: '700' }}>{k.label}</p>
              <p style={{ fontSize: '22px', fontWeight: '800', color: k.color }}>{k.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Area Chart */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: '600' }}>Sales & Profit Trend</h2>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Monthly performance</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="gProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
            <XAxis dataKey="month" stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }}/>
            <YAxis stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`}/>
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', fontSize: '12px' }}
              formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, '']}
            />
            <Legend/>
            <Area type="monotone" dataKey="total_sales"  stroke="#6366f1" fill="url(#gSales)"  strokeWidth={2.5} dot={false} name="Sales"/>
            <Area type="monotone" dataKey="total_profit" stroke="#10b981" fill="url(#gProfit)" strokeWidth={2.5} dot={false} name="Profit"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders Table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600' }}>Recent Orders</h2>
          <span style={{ fontSize: '11px', color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(99,102,241,0.2)' }}>
            Live
          </span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Order ID','Date','Customer','Segment','Value','Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: h === 'Value' ? 'right' : 'left', fontSize: '10px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '11px', color: '#818cf8' }}>{o.order_id}</td>
                <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>{o.order_date?.substring(0,10)}</td>
                <td style={{ padding: '12px', fontWeight: '600', color: '#f1f5f9' }}>{o.customer_name}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: '600',
                    background: o.segment === 'Consumer' ? 'rgba(59,130,246,0.12)' : o.segment === 'Corporate' ? 'rgba(139,92,246,0.12)' : 'rgba(245,158,11,0.12)',
                    color: o.segment === 'Consumer' ? '#60a5fa' : o.segment === 'Corporate' ? '#a78bfa' : '#fbbf24',
                    border: `1px solid ${o.segment === 'Consumer' ? 'rgba(59,130,246,0.25)' : o.segment === 'Corporate' ? 'rgba(139,92,246,0.25)' : 'rgba(245,158,11,0.25)'}`
                  }}>{o.segment}</span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700', color: '#34d399' }}>₹{Number(o.order_value).toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: '600', background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}>✓ Done</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}