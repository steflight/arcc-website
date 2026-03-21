import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth()
  if (!session) redirect('/login')

  return <>{children}</>
}

