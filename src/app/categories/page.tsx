'use client';
import { Orbitron } from 'next/font/google'
import Link from 'next/link'

const orbitron = Orbitron({ subsets: ['latin'] })

const shimmer = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`

const categories = [
  { name: 'Capital Cities', icon: '🏙️' },
  { name: 'Countries', icon: '🌎' },
  { name: 'Flags', icon: '🚩' }, 
]

const titleHoverEffect = `
  @keyframes titleHover {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`

export default function CategoriesPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-100 to-gray-200 flex items-center justify-center ${orbitron.className}`}>
      <style jsx>{shimmer}</style>
      <style jsx>{titleHoverEffect}</style>
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-blue-200 opacity-30" style={{ animation: 'shimmer 2s infinite' }}></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center mb-8 relative">
            <span className="relative inline-block">
              <span className="relative z-10 text-gray-800">Choose a Category</span>
              <span className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-blue-500 transform -skew-x-12"></span>
            </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="block"
              >
                <div className="bg-white bg-opacity-30 hover:bg-opacity-40 transition-all duration-300 rounded-lg p-6 text-center cursor-pointer transform hover:scale-105">
                  <span className="text-5xl mb-4 block">{category.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

