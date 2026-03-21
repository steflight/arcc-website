'use client'

import { useEffect, useMemo, useState } from 'react'

type Doc = { filename: string; title: string; content: string }

export default function KnowledgeEditor({ docs }: { docs: Doc[] }) {
  const [selectedFilename, setSelectedFilename] = useState(
    docs[0]?.filename ?? ''
  )
  const selectedDoc = useMemo(
    () => docs.find((d) => d.filename === selectedFilename) ?? null,
    [docs, selectedFilename]
  )

  const [content, setContent] = useState(selectedDoc?.content ?? '')
  const [message, setMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (selectedDoc) setContent(selectedDoc.content)
  }, [selectedDoc?.filename])

  const handleSave = async () => {
    setMessage(null)
    setIsSaving(true)
    try {
      const res = await fetch('/api/admin/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: selectedFilename, content }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setMessage(data?.error ?? 'Erreur lors de la sauvegarde.')
        return
      }
      setMessage('Sauvegarde effectuee.')
    } finally {
      setIsSaving(false)
    }
  }

  if (docs.length === 0) {
    return (
      <div className="border border-gray-200 rounded-2xl p-4 bg-white text-sm text-gray-600">
        Aucun document RAG trouve dans <code>content/rag</code>.
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="space-y-1">
          <label className="text-sm font-medium">Document</label>
          <select
            className="w-full md:w-96 rounded-xl border border-gray-200 px-3 py-2"
            value={selectedFilename}
            onChange={(e) => setSelectedFilename(e.target.value)}
          >
            {docs.map((d) => (
              <option value={d.filename} key={d.filename}>
                {d.title}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium">Contenu (Markdown)</label>
        <textarea
          className="w-full min-h-[360px] rounded-xl border border-gray-200 px-3 py-2 mt-2 font-mono text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {message && (
        <p className="mt-3 text-sm border border-gray-200 bg-gray-50 rounded-xl p-2">
          {message}
        </p>
      )}
    </div>
  )
}

