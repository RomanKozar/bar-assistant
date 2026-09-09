import { NavLink, Outlet } from 'react-router-dom'
import { sectionMeta, sectionOrder } from '../data/sections'

export function Layout() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-kicker">Bar Assistant</p>
            <h1>Помічник бармена</h1>
          </div>
        </NavLink>

        <nav className="nav">
          {sectionOrder.map((section) => (
            <NavLink
              key={section}
              to={sectionMeta[section].path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {sectionMeta[section].title}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
