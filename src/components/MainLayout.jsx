import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AnnouncementBanner from './AnnouncementBanner'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchOverlay from './SearchOverlay'
import ToastStack from './ToastStack'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <AnnouncementBanner />
      <Header onOpenSearch={() => setSearchOpen(true)} onOpenCart={() => setCartOpen(true)} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ToastStack />
    </div>
  )
}
