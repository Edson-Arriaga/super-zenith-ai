import { IconType } from "react-icons";

export type Achievement = {
    id: number
    name: string
    description: string
    color: string
}

export type NavItem = {
    id: number
    pageName: string
    href: string
    icon: IconType
}