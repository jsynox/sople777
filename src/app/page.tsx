"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pacifico } from 'next/font/google'
import Link from "next/link"

const pacifico = Pacifico({ weight: "400", subsets: ['latin'] })

export default function FancyPlayButtonWithEffects() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleClick = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-green-900 overflow-hidden">
      <header className="mb-12 text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-gray-200 tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            animate={{ color: ['#e2e8f0', '#4fd1c5', '#e2e8f0'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GuessOr
          </motion.span>
          <motion.span
            animate={{ color: ['#4fd1c5', '#e2e8f0', '#4fd1c5'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Know
          </motion.span>
        </motion.h1>
      </header>
      <div className="relative">
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 2, 3], opacity: [0.5, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, times: [0, 0.5, 1] }}
            >
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="absolute inset-0 rounded-full bg-green-400 opacity-30"
                  style={{
                    transform: `scale(${1 + index * 0.5})`,
                    animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite ${index * 0.5}s`
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className={`relative flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ${pacifico.className}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          <motion.div
            className="absolute inset-0 bg-gray-200 rounded-full"
            initial={false}
            animate={isPlaying ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.span
            className="text-3xl text-green-700"
            animate={isPlaying ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
          PLAY
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}

