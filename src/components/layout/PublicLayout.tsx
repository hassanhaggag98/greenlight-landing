import { Outlet } from 'react-router-dom'
import { ScrollToTop, WhatsAppButton } from '@/components/common'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
