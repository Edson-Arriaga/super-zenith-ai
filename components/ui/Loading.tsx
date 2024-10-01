"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

const motivationalPhrases = [
  "Construye hábitos, construye tu futuro",
  "Pequeños pasos, grandes cambios",
  "La consistencia es la clave del éxito",
  "Cada día es una nueva oportunidad",
  "Tus hábitos definen tu destino",
]

export default function Loading() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % motivationalPhrases.length)
    }, 3000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 100)
    }, 50)

    return () => {
      clearInterval(phraseInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mt-20 bg-zenith-dark-purple p-4">
      <div className="relative w-64 h-64 mb-8">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0 rounded-full border-4 border-purple-500 opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-purple-700 opacity-25"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          <motion.circle
            className="text-yellow-400"
            strokeWidth="8"
            strokeDasharray="264"
            strokeDashoffset="264"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
            style={{
              strokeDashoffset: 264 - (264 * progress) / 100,
            }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative w-36 h-36">
              <Image
                src="/images/zenith-logo.png"
                alt="Zenith Logo"
                fill
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentPhrase}
          className="text-yellow-400 text-xl font-bold text-center max-w-xs mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {motivationalPhrases[currentPhrase]}
        </motion.p>
      </AnimatePresence>
      <div className="flex space-x-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}