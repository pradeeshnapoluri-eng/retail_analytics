import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const fmt = (v) => {
  try { return `₹${Number(v).toLocaleString('en-IN')}` }
  catch { return `₹${Number(v).toLocaleString()}` }
}

export default function Products() {
  const [overview, setOverview] = useState(null)
  const [byCategory, setByCategory] = useState([])
  const [topSelling, setTopSelling] = useState([])
  const [lowProfit, setLowProfit] = useState([])

  useEffect(() => {
    axiosClient.get('/products/overview').then(r => setOverview(r.data)).catch(() => {})
    axiosClient.get('/products/by-category').then(r => setByCategory(r.data)).catch(() => {})
    axiosClient.get('/products/top-selling').then(r => setTopSelling(r.data)).catch(() => {})
    axiosClient.get('/products/low-profit').then(r => setLowProfit(r.data)).catch(() => {})
  }, [])

  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>📦 Product Analytics</h1>

      {overview && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Products', value: overview.total_products, color: '#3b82f6' },
            { label: 'Sub-Categories', value: overview.total_sub_categories, color: '#6366f1' },
          ].map((k, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${k.color}44`, borderRadius: '14px', padding: '20px' }}>
              <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>{k.label}</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: k.color }}>{k.value}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Sales by Sub-Category</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={byCategory} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis type="number" stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} />
            <YAxis dataKey="sub_category_name" type="category" stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} width={90} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }}
              formatter={(v) => [fmt(v), '']}
            />
            <Bar dataKey="total_sales" fill="#6366f1" radius={[0, 4, 4, 0]} name="Sales" />
            <Bar dataKey="total_profit" fill="#10b981" radius={[0, 4, 4, 0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>🏆 Top Selling</h2>
          {topSelling.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#475569', fontSize: '12px', width: '18px' }}>{i + 1}</span>
                <span style={{ color: '#cbd5e1', fontSize: '12px' }}>{p.product_name.substring(0, 28)}...</span>
              </div>
              <span style={{ color: '#818cf8', fontWeight: '600', fontSize: '13px' }}>{fmt(p.total_sales)}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '16px', padding: '22px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#f87171' }}>⚠️ Low Profit</h2>
          {lowProfit.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#cbd5e1', fontSize: '12px' }}>{p.product_name.substring(0, 28)}...</span>
              <span style={{ color: '#f87171', fontWeight: '600', fontSize: '13px' }}>{fmt(p.total_profit)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}