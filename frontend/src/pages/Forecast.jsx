import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const fmt = (v) => {
  try { return `₹${Number(v).toLocaleString('en-IN')}` }
  catch { return `₹${Number(v).toLocaleString()}` }
}

export default function Forecast() {
  const [data, setData] = useState([])

  useEffect(() => {
    axiosClient.get('/sales/monthly').then(r => {
      const historical = r.data.map(d => ({ ...d, type: 'actual' }))

      if (historical.length === 0) return

      const last = historical[historical.length - 1]
      const avg = historical.slice(-6).reduce((s, d) => s + Number(d.total_sales), 0) / 6

      // Parse last month correctly
      const parts = last.month.split('-')
      const lastYear = parseInt(parts[0])
      const lastMonth = parseInt(parts[1])

      const forecasted = Array.from({ length: 6 }, (_, i) => {
        let y = lastYear
        let m = lastMonth + i + 1
        if (m > 12) { m = m - 12; y = y + 1 }
        const monthStr = `${y}-${String(m).padStart(2, '0')}`
        return {
          month: monthStr,
          total_sales: Math.round(avg * Math.pow(1.03, i + 1)),
          type: 'forecast'
        }
      })

      setData([...historical, ...forecasted])
    }).catch(() => {})
  }, [])

  const splitMonth = data.find(d => d.type === 'forecast')?.month

  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>🔮 Sales Forecast</h1>
      <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>Historical data + 6-month forecast (3% monthly growth model)</p>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px', marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="month" stroke="#374151" tick={{ fontSize: 9, fill: '#6b7280' }} />
            <YAxis stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }}
              formatter={(v, n, p) => [fmt(v), p.payload.type === 'forecast' ? '🔮 Forecast' : '📊 Actual']}
            />
            {splitMonth && (
              <ReferenceLine x={splitMonth} stroke="#ef4444" strokeDasharray="4 4"
                label={{ value: 'Forecast →', fill: '#ef4444', fontSize: 11 }} />
            )}
            <Area type="monotone" dataKey="total_sales" stroke="#6366f1" fill="url(#grad1)" strokeWidth={2.5} dot={false} name="Sales" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Forecast Table (Last 6 + Next 6)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ color: '#475569', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Month</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Sales</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(-12).map((d, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '11px 10px', color: '#cbd5e1' }}>{d.month}</td>
                <td style={{ padding: '11px 10px', textAlign: 'right', fontWeight: '600', color: '#34d399' }}>{fmt(d.total_sales)}</td>
                <td style={{ padding: '11px 10px', textAlign: 'right' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: '600',
                    background: d.type === 'forecast' ? 'rgba(245,158,11,0.12)' : 'rgba(99,102,241,0.12)',
                    color: d.type === 'forecast' ? '#fbbf24' : '#818cf8',
                    border: `1px solid ${d.type === 'forecast' ? 'rgba(245,158,11,0.25)' : 'rgba(99,102,241,0.25)'}`
                  }}>
                    {d.type === 'forecast' ? '🔮 Forecast' : '✅ Actual'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}