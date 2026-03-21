import fs from 'fs'
import path from 'path'

export interface RagDocument {
  filename: string
  title: string
  content: string
}

function safeReadDir(absDir: string): string[] {
  if (!fs.existsSync(absDir)) return []
  return fs.readdirSync(absDir)
}

export function loadRagDocuments(): RagDocument[] {
  const documentsDir = path.join(process.cwd(), 'content', 'rag')
  const filenames = safeReadDir(documentsDir).filter((f) => f.endsWith('.md'))

  return filenames.map((filename) => {
    const fullPath = path.join(documentsDir, filename)
    const content = fs.readFileSync(fullPath, 'utf8')
    const title =
      filename
        .replace(/\.md$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (m) => m.toUpperCase()) || filename

    return { filename, title, content }
  })
}

function scoreDocument(query: string, doc: RagDocument): number {
  const q = query.toLowerCase().trim()
  if (!q) return 0

  // Scoring simple par occurrences de mots-clés.
  const tokens = q
    .split(/\s+/g)
    .map((t) => t.replace(/[^\p{L}\p{N}]+/gu, '').toLowerCase())
    .filter(Boolean)

  const haystack = doc.content.toLowerCase()
  let score = 0

  for (const token of tokens) {
    const re = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    const matches = haystack.match(re)
    score += matches?.length ?? 0
  }

  return score
}

export function getRelevantRagDocuments(query: string, limit = 3): RagDocument[] {
  const docs = loadRagDocuments()
  if (docs.length === 0) return []

  return docs
    .map((doc) => ({ doc, score: scoreDocument(query, doc) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.doc)
}

