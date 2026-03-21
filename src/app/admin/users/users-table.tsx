'use client'

import { useState } from 'react'

type UserRow = {
  id: string
  email: string | null
  name: string | null
  role: 'ADMIN' | 'MEMBER' | 'STAFF'
  phone: string | null
  city: string | null
  membershipStatus: string
  membershipValidUntil: string | Date | null
}

export default function UsersTable({ users }: { users: UserRow[] }) {
  const [rows, setRows] = useState(users)
  const [isSavingId, setIsSavingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, nextRole: UserRow['role']) => {
    setError(null)
    setIsSavingId(userId)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: nextRole }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error ?? "Erreur lors de la sauvegarde.")
        return
      }

      setRows((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
      )
    } finally {
      setIsSavingId(null)
    }
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white overflow-x-auto">
      {error && (
        <p className="mb-3 text-sm text-red-800 border border-red-200 bg-red-50 rounded-xl p-2">
          {error}
        </p>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="py-2 pr-3">Utilisateur</th>
            <th className="py-2 pr-3">Role</th>
            <th className="py-2 pr-3">Adhesion</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.id} className="border-b border-gray-100">
              <td className="py-2 pr-3">
                <div className="font-semibold">{u.name ?? '—'}</div>
                <div className="text-xs text-gray-500">{u.email ?? ''}</div>
              </td>
              <td className="py-2 pr-3">
                <select
                  className="rounded-xl border border-gray-200 px-2 py-1"
                  value={u.role}
                  disabled={isSavingId === u.id}
                  onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="STAFF">STAFF</option>
                  <option value="MEMBER">MEMBER</option>
                </select>
              </td>
              <td className="py-2 pr-3">
                <div className="font-semibold">{u.membershipStatus}</div>
                {u.membershipValidUntil && (
                  <div className="text-xs text-gray-500">
                    Valide jusqu’au{' '}
                    {new Date(u.membershipValidUntil).toLocaleDateString('fr-CA')}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

