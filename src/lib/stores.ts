import { writable } from "svelte/store";
import { type IconsFile } from "./types";

export const query = writable('')
export const icons = writable<IconsFile>({})
export const selectedCategories = writable<string[]>([])