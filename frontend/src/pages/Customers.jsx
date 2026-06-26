import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'

export default function Customers() {
  const [overview, setOverview] = useState(null)
  const [segments, setSegments] = useState([])
  const [topCustomers, setTopCustomers] = useState([])

  useEffect(() => {
    axiosClient.get('/customers/overview').then(r => setOverview(r.data)).catch(() => {})
    axiosClient.get('/customers/by-segment').then(r => setSegments(r.data)).catch(() => {})
    axiosClient.get('/customers/top').then(r => setTopCustomers(r.data)).catch(() => {})
  }, [])

  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>👥 Customer Analytics</h1>
      {overview && (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '14px', padding: '20px', flex: 1 }}>
            <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Total Customers</p>
            <p style={{ fontSize: '28px', fontWeight: '800', color: '#818cf8' }}>{overview.total_customers}</p>
          </div>
          <div style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '14px', padding: '20px', flex: 1 }}>
            <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Segments</p>
            <p style={{ fontSize: '28px', fontWeight: '800', color: '#a78bfa' }}>{overview.total_segments}</p>
          </div>
        </div>
      )}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Sales by Segment</h2>
        {segments.map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#cbd5e1' }}>{s.segment}</span>
            <span style={{ color: '#34d399', fontWeight: '600' }}>₹{Number(s.total_sales).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Top 10 Customers</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ color: '#475569', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>#</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Segment</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Sales</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Profit</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 10px', color: '#475569' }}>{i + 1}</td>
                <td style={{ padding: '12px 10px', fontWeight: '600', color: '#f1f5f9' }}>{c.customer_name}</td>
                <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{c.segment}</td>
                <td style={{ padding: '12px 10px', textAlign: 'right', color: '#818cf8', fontWeight: '600' }}>₹{Number(c.total_sales).toLocaleString()}</td>
                <td style={{ padding: '12px 10px', textAlign: 'right', color: '#34d399', fontWeight: '600' }}>₹{Number(c.total_profit).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}