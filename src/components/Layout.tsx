import { NavLink, Outlet } from 'react-router-dom'
import { sectionMeta, sectionOrder } from '../data/sections'

function navLinkClass(isActive: boolean) {
  return isActive ? 'nav-link active' : 'nav-link'
}

function mobileNavLinkClass(isActive: boolean) {
  return isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
}

export function Layout() {
  return (
    <div className="shell">
      <header className="mobile-header">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark" aria-hidden="true" />
          <p className="brand-kicker">Bar Assistant</p>
        </NavLink>
      </header>

      <aside className="sidebar">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-kicker">Bar Assistant</p>
          </div>
        </NavLink>

        <nav className="nav">
          {sectionOrder.map((section) => (
            <NavLink
              key={section}
              to={sectionMeta[section].path}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              {sectionMeta[section].title}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>

      <nav className="mobile-nav" aria-label="Навігація">
        <NavLink to="/" end className={({ isActive }) => mobileNavLinkClass(isActive)}>
          Меню
        </NavLink>
        {sectionOrder.map((section) => (
          <NavLink
            key={section}
            to={sectionMeta[section].path}
            className={({ isActive }) => mobileNavLinkClass(isActive)}
          >
            {sectionMeta[section].navShort}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
