import { loadRagDocuments } from '@/lib/rag/document-loader'
import KnowledgeEditor from './knowledge-editor'

export default function AdminKnowledgePage() {
  const docs = loadRagDocuments()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gestion RAG</h1>
      <p className="text-sm text-gray-600">
        Ces documents alimentent directement le chatbot. Modifiez et sauvegardez.
      </p>

      <KnowledgeEditor docs={docs} />
    </div>
  )
}

