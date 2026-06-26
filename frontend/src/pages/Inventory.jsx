import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function Inventory() {
  const [overview, setOverview] = useState(null)
  const [byCategory, setByCategory] = useState([])
  const [discounts, setDiscounts] = useState([])

  useEffect(() => {
    axiosClient.get('/inventory/overview').then(r => setOverview(r.data)).catch(() => {})
    axiosClient.get('/inventory/by-category').then(r => setByCategory(r.data)).catch(() => {})
    axiosClient.get('/inventory/discount-analysis').then(r => setDiscounts(r.data)).catch(() => {})
  }, [])

  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>🏭 Inventory Analytics</h1>
      {overview && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Units Sold', value: overview.total_units_sold, color: '#3b82f6' },
            { label: 'Avg Discount', value: `${overview.avg_discount_pct}%`, color: '#f59e0b' },
            { label: 'Unique Products', value: overview.unique_products_sold, color: '#6366f1' },
          ].map((k, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${k.color}44`, borderRadius: '14px', padding: '20px' }}>
              <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>{k.label}</p>
              <p style={{ fontSize: '26px', fontWeight: '800', color: k.color }}>{k.value}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Units by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="category_name" stroke="#374151" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }} />
              <Bar dataKey="total_units" fill="#6366f1" radius={[4, 4, 0, 0]} name="Units" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Discount Analysis</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={discounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="discount_range" stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis stroke="#374151" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }} />
              <Legend />
              <Bar dataKey="total_sales" fill="#6366f1" radius={[4, 4, 0, 0]} name="Sales" />
              <Bar dataKey="total_profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}