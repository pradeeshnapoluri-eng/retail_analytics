import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const fmt = (v) => {
  try { return `₹${Number(v).toLocaleString('en-IN')}` }
  catch { return `₹${Number(v).toLocaleString('en-IN')}` }
}

export default function Sales() {
  const [overview, setOverview] = useState(null)
  const [monthly, setMonthly] = useState([])
  const [byCategory, setByCategory] = useState([])
  const [byRegion, setByRegion] = useState([])

  useEffect(() => {
    axiosClient.get('/sales/overview').then(r => setOverview(r.data)).catch(() => {})
    axiosClient.get('/sales/monthly').then(r => {
      const cleaned = r.data.map(d => ({ ...d, month: d.month?.substring(0, 7) }))
      setMonthly(cleaned)
    }).catch(() => {})
    axiosClient.get('/sales/by-category').then(r => {
      if (r.data && r.data.length > 0) setByCategory(r.data)
    }).catch(() => {})
    axiosClient.get('/sales/by-region').then(r => setByRegion(r.data)).catch(() => {})
  }, [])

  return (
    <div style={{ padding: '10px' }}>

      {/* Header */}
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>💰 Sales Analytics</h1>

      {/* KPI Cards */}
      {overview && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Sales',   value: fmt(overview.total_sales),   color: '#6366f1' },
            { label: 'Total Profit',  value: fmt(overview.total_profit),  color: '#10b981' },
            { label: 'Total Orders',  value: overview.total_orders,       color: '#3b82f6' },
            { label: 'Units Sold',    value: overview.total_quantity,     color: '#f59e0b' },
          ].map((k, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${k.color}44`,
              borderRadius: '14px',
              padding: '20px',
              transition: 'transform 0.2s',
              cursor: 'default'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: '700' }}>{k.label}</p>
              <p style={{ fontSize: '22px', fontWeight: '800', color: k.color }}>{k.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Monthly Sales + Sales by Category */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

        {/* Monthly Sales Bar Chart */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#818cf8' }}>Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" stroke="#374151" tick={{ fontSize: 9, fill: '#6b7280' }} />
              <YAxis stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', fontSize: '12px' }}
                formatter={(v) => [fmt(v), 'Sales']}
              />
              <Bar dataKey="total_sales" fill="#6366f1" radius={[4, 4, 0, 0]} name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category Bar Chart */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#818cf8' }}>Sales by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="category_name" stroke="#374151" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', fontSize: '12px' }}
                formatter={(v) => [fmt(v), '']}
              />
              <Legend />
              <Bar dataKey="total_sales"  fill="#6366f1" radius={[4, 4, 0, 0]} name="Sales"  />
              <Bar dataKey="total_profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Sales by Region */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#818cf8' }}>Sales by Region</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byRegion} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis type="number" stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <YAxis dataKey="region_name" type="category" stroke="#374151" tick={{ fontSize: 11, fill: '#6b7280' }} width={70} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', fontSize: '12px' }}
              formatter={(v) => [fmt(v), '']}
            />
            <Legend />
            <Bar dataKey="total_sales"  fill="#6366f1" radius={[0, 4, 4, 0]} name="Sales"  />
            <Bar dataKey="total_profit" fill="#10b981" radius={[0, 4, 4, 0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products Table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#818cf8' }}>Monthly Profit vs Sales</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly.slice(-12)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="month" stroke="#374151" tick={{ fontSize: 9, fill: '#6b7280' }} />
            <YAxis stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', fontSize: '12px' }}
              formatter={(v) => [fmt(v), '']}
            />
            <Legend />
            <Bar dataKey="total_sales"  fill="#6366f1" radius={[4, 4, 0, 0]} name="Sales"  />
            <Bar dataKey="total_profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}