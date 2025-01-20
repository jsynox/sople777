import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Categories | Geography Quiz',
  description: 'Choose a category to start your geography quiz',
}

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-gray-200">
      {children}
    </div>
  )
}

