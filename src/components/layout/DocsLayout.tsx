import { Outlet } from 'react-router-dom'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'

export function DocsLayout() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-10 md:px-12 md:py-14 max-w-[920px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
