import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { loadRagDocuments } from '@/lib/rag/document-loader'
import PayMembershipButton from './pay-membership-button'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await auth()
  const userId = (session?.user as any)?.id as string | undefined

  const user = userId
    ? await prisma.user.findUnique({ where: { id: userId } })
    : null

  const ragDocs = loadRagDocuments()

  if (!user) {
    return (
      <div className="p-4 text-sm text-red-700">
        Impossible de charger votre profil.
      </div>
    )
  }

  const membershipActive = user.membershipStatus === 'ACTIVE'

  return (
    <div className="space-y-6">
      <section className="border border-gray-200 rounded-2xl p-5">
        <h1 className="text-2xl font-bold mb-2">Espace membre</h1>
        <p className="text-sm text-gray-600">
          Bonjour {user.name ?? 'membre'} · Rôle : {user.role}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-gray-600">Statut adhésion</p>
            <p className="text-lg font-semibold">
              {user.membershipStatus === 'ACTIVE'
                ? 'Active'
                : user.membershipStatus === 'EXPIRED'
                  ? 'Expiree'
                  : 'Inactive'}
            </p>
            {user.membershipValidUntil && (
              <p className="text-sm text-gray-600">
                Valide jusqu’au {user.membershipValidUntil.toLocaleDateString('fr-CA')}
              </p>
            )}
          </div>

          {!membershipActive ? (
            <PayMembershipButton email={user.email ?? ''} />
          ) : (
            <div className="text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
              Merci ! Votre adhésion est active.
            </div>
          )}
        </div>
      </section>

      <section className="border border-gray-200 rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-3">Ressources ARCC (astuces pratiques)</h2>
        <p className="text-sm text-gray-600 mb-4">
          Ces guides alimentent aussi le chatbot. Choisissez un sujet et posez votre question.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ragDocs.slice(0, 6).map((doc) => (
            <div key={doc.filename} className="border border-gray-200 rounded-2xl p-4 bg-white">
              <h3 className="font-semibold">{doc.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{doc.filename}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

