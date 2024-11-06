import { IconType } from 'react-icons'
import { FaBaby, FaWalking, FaRunning, FaCalendarDay, FaCalendarWeek, FaRedo, FaCube, FaDna } from 'react-icons/fa'
import { GiPodiumWinner, GiMedal } from 'react-icons/gi'

export const iconMapping : {[key: number] : IconType} = {
  0: FaBaby,
  1: FaWalking,
  2: GiMedal,
  3: FaRunning,
  4: GiPodiumWinner,
  5: FaCalendarDay,
  6: FaCalendarWeek,
  7: FaRedo,
  8: FaCube,
  9: FaDna
}

export const achievements = [
    {
      id: 0,
      name: 'Inicializante',
      description: 'Crea tu primer hábito',
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 1,
      name: 'Primer Paso',
      description: 'Completa tu primer hábito',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 2,
      name: 'Mini Maestro',
      description: 'Completa un hábito de duración corta',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 3,
      name: 'Mediador del Camino',
      description: 'Completa un hábito de duración intermedia',
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 4,
      name: 'Maratonista de Hábitos',
      description: 'Completa un hábito de duración Definitiva',
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 5,
      name: 'Día a Día',
      description: 'Completa un hábito diario',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 6,
      name: 'Ritual Semanal',
      description: 'Completa un hábito semanal',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 7,
      name: 'Renovador',
      description: 'Reinicia un hábito',
      color: 'from-teal-400 to-green-500'
    },
    {
      id: 8,
      name: 'Constructor de Hábitos',
      description: 'Completa 5 hábitos',
      color: 'from-blue-400 to-teal-500'
    },
    {
      id: 9,
      name: 'Maestro de la Constancia',
      description: 'Completa 10 hábitos',
      color: 'from-purple-400 to-indigo-500'
    }
  ]
