import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar   from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Sales     from './pages/Sales'
import Customers from './pages/Customers'
import Products  from './pages/Products'
import Inventory from './pages/Inventory'
import Forecast  from './pages/Forecast'

export default function App() {
  return (
    <BrowserRouter>
      <div className="terminal-bg" style={{ display:'flex', minHeight:'100vh', background:'#000', color:'#e2e8f0' }}>
        <Sidebar />
        <main style={{ flex:1, overflowY:'auto', position:'relative', zIndex:1 }}>
          <Routes>
            <Route path="/"          element={<Dashboard />}  />
            <Route path="/sales"     element={<Sales />}      />
            <Route path="/customers" element={<Customers />}  />
            <Route path="/products"  element={<Products />}   />
            <Route path="/inventory" element={<Inventory />}  />
            <Route path="/forecast"  element={<Forecast />}   />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}