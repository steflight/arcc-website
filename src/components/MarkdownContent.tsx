'use client'

import React from 'react'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Fonction simple pour convertir le markdown basique en HTML
  const formatContent = (text: string) => {
    return text
      // Gras
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italique
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Liens
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Listes à puces
      .replace(/^\- (.*$)/gim, '<li class="ml-4">• $1</li>')
      // Numéros de téléphone
      .replace(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/g, '<a href="tel:$1" class="text-blue-600 hover:underline font-semibold">$1</a>')
      // Emails
      .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="text-blue-600 hover:underline font-semibold">$1</a>')
      // Retours à la ligne
      .replace(/\n/g, '<br>')
  }

  return (
    <div 
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ 
        __html: formatContent(content) 
      }}
    />
  )
}
