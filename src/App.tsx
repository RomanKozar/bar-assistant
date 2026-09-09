import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BarProvider } from './context/BarProvider'
import { CatalogPage } from './pages/Catalog'
import { DashboardPage } from './pages/Dashboard'
import { InventoryPage } from './pages/Inventory'
import { RecipePage } from './pages/Recipe'

export default function App() {
  return (
    <BarProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/bar" element={<InventoryPage />} />
            <Route path="/:section" element={<CatalogPage />} />
            <Route path="/:section/:id" element={<RecipePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BarProvider>
  )
}
