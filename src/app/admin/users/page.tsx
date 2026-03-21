import { prisma } from '@/lib/prisma'
import UsersTable from './users-table'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      city: true,
      membershipStatus: true,
      membershipValidUntil: true,
    },
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gestion des comptes</h1>
      <p className="text-sm text-gray-600">
        Modifier les rôles pour donner acces aux zones `admin` ou `staff`.
      </p>
      <UsersTable users={users} />
    </div>
  )
}

