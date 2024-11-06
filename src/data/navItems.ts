import { HiCalendarDays } from "react-icons/hi2"
import { NavItem } from "../types"
import { BiSolidMedal } from "react-icons/bi"
import { FaFileInvoiceDollar, FaHistory } from "react-icons/fa"

export const navItems : NavItem[] = [
    {
        id: 0,
        pageName: 'Habit Tracker',
        href: '/habit-tracker',
        icon: HiCalendarDays
    },
    {
        id: 1,
        pageName: 'Logros',
        href: '/achievements',
        icon: BiSolidMedal
    },
    {
        id: 2,
        pageName: 'Hábitos Completos',
        href: '/completed-habits-history',
        icon: FaHistory
    },
    {
        id: 1,
        pageName: 'Planes',
        href: '/plans',
        icon: FaFileInvoiceDollar
    }
]