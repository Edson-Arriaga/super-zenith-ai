import { IconType } from "react-icons";

export type Achievement = {
    id: number;
    name: string;
    description: string;
    icon: IconType;
    color: string;
}

export type NavItem = {
    id: number,
    pageName: string,
    href: string,
    icon: IconType
}