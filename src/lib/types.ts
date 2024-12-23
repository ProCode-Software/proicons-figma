import { type Component } from "svelte"

export interface Icon {
    description: string
    icon: string,
    category: string
}
export type IconsFile = Record<string, Icon>
