import { NavLink, Outlet } from 'react-router-dom'
import PageFade from '../../components/PageFade'
import styles from './Account.module.css'

const links = [
  ['', 'Overview'],
  ['orders', 'Orders'],
  ['returns', 'Returns'],
  ['wishlist', 'Wishlist'],
  ['addresses', 'Addresses'],
  ['profile', 'Profile'],
  ['password', 'Password'],
]

export default function AccountLayout() {
  return (
    <PageFade>
      <div className={styles.page}>
        <nav className={styles.tabs} aria-label="Account">
          {links.map(([path, label]) => (
            <NavLink
              key={path || 'overview'}
              to={path ? `/account/${path}` : '/account'}
              end={path === ''}
              className={({ isActive }) => (isActive ? styles.tabActive : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </PageFade>
  )
}
