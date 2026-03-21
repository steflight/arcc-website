import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { loadRagDocuments } from '@/lib/rag/document-loader'

const postSchema = z.object({
  filename: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+\.md$/),
  content: z.string().min(1),
})

export async function GET() {
  const docs = loadRagDocuments()
  return NextResponse.json({ docs })
}

export async function POST(request: NextRequest) {
  const session = await auth()
  const role = (session?.user as any)?.role

  if (!session) return NextResponse.json({ error: 'Non connecte.' }, { status: 401 })
  if (role !== 'ADMIN' && role !== 'STAFF') {
    return NextResponse.json({ error: 'Acces interdit.' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const parsed = postSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Donnnees invalides.' }, { status: 400 })
    }

    const { filename, content } = parsed.data
    const documentsDir = path.join(process.cwd(), 'content', 'rag')

    const absPath = path.join(documentsDir, filename)
    const normalized = path.normalize(absPath)
    const normalizedDir = path.normalize(documentsDir)

    if (!normalized.startsWith(normalizedDir)) {
      return NextResponse.json({ error: 'Nom de fichier invalide.' }, { status: 400 })
    }

    fs.mkdirSync(documentsDir, { recursive: true })
    fs.writeFileSync(normalized, content, 'utf8')

    revalidatePath('/admin/knowledge')

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Erreur /api/admin/knowledge:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    )
  }
}

