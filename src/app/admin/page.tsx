import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  const [usersCount, activeMembersCount] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { membershipStatus: 'ACTIVE' } }),
  ])

  return (
    <div className="space-y-5">
      <section className="border border-gray-200 rounded-2xl p-5 bg-white">
        <h1 className="text-2xl font-bold mb-3">Tableau de bord admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-600">Total comptes</p>
            <p className="text-2xl font-bold">{usersCount}</p>
          </div>
          <div className="border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-600">Membres actifs</p>
            <p className="text-2xl font-bold">{activeMembersCount}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/knowledge"
          className="border border-gray-200 rounded-2xl p-5 hover:bg-[#F5F5DC]/50 transition-colors"
        >
          <h2 className="font-bold">Gestion RAG (guides/FAQ)</h2>
          <p className="text-sm text-gray-600 mt-1">
            Creez et modifiez les documents qui alimentent le chatbot.
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="border border-gray-200 rounded-2xl p-5 hover:bg-[#F5F5DC]/50 transition-colors"
        >
          <h2 className="font-bold">Gestion des comptes</h2>
          <p className="text-sm text-gray-600 mt-1">
            Mettez a jour les rôles admin/membre/staff.
          </p>
        </Link>
      </section>
    </div>
  )
}

