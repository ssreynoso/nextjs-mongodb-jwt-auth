import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const execURL = function (url: string) {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.style.display = 'none'
    document.querySelector('body')?.appendChild(link)
    link.click()
    document.removeChild(link)
}

export const setCSSVariable = function (variable: string, value: string) {
    document.documentElement.style.setProperty(variable, value)
}
