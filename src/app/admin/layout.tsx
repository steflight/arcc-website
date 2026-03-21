import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth()
  if (!session) redirect('/login')

  const role = (session.user as any)?.role
  if (role !== 'ADMIN' && role !== 'STAFF') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="font-bold text-[#8B4513]">ARCC Admin</div>
        <div className="space-x-4 text-sm">
          <Link className="text-[#8B4513] font-semibold" href="/dashboard">
            Retour au membre
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
    </div>
  )
}

