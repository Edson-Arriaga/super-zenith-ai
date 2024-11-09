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
    },
    {
      id: 1,
      name: 'Primer Paso',
      description: 'Completa tu primer hábito',
    },
    {
      id: 2,
      name: 'Mini Maestro',
      description: 'Completa un hábito de duración corta',
    },
    {
      id: 3,
      name: 'Mediador del Camino',
      description: 'Completa un hábito de duración intermedia',
    },
    {
      id: 4,
      name: 'Maratonista de Hábitos',
      description: 'Completa un hábito de duración Definitiva',
    },
    {
      id: 5,
      name: 'Día a Día',
      description: 'Completa un hábito diario',
    },
    {
      id: 6,
      name: 'Ritual Semanal',
      description: 'Completa un hábito semanal',
    },
    {
      id: 7,
      name: 'Renovador',
      description: 'Reinicia un hábito'
    },
    {
      id: 8,
      name: 'Constructor de Hábitos',
      description: 'Completa 5 hábitos'
    },
    {
      id: 9,
      name: 'Maestro de la Constancia',
      description: 'Completa 10 hábitos'
    }
  ]
