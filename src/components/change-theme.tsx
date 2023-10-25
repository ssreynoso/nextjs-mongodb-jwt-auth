'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from './ui/select'

const THEMES = ['gray', 'neutral', 'slate', 'stone', 'zinc'] as const
type ThemeType = (typeof THEMES)[number]
import grayJson from '@/styles/themes/gray.json'
import neutralJson from '@/styles/themes/neutral.json'
import slateJson from '@/styles/themes/slate.json'
import stoneJson from '@/styles/themes/stone.json'
import zincJson from '@/styles/themes/zinc.json'

import { setCSSVariable } from '@/lib/utils'


export const ChangeTheme = () => {
    const { resolvedTheme } = useTheme()
    const [colorTheme, setColorTheme] = useState<ThemeType>('slate')

    useEffect(() => {
        if (resolvedTheme && colorTheme) {
            let file: { light: object; dark: object }
            switch (colorTheme) {
                case 'gray':
                    file = grayJson
                    break
                case 'neutral':
                    file = neutralJson
                    break
                case 'slate':
                    file = slateJson
                    break
                case 'stone':
                    file = stoneJson
                    break
                case 'zinc':
                    file = zincJson
                    break
            }

            const fileObject = file[resolvedTheme as 'light' | 'dark']

            if (fileObject) {
                Object.entries(fileObject).forEach(([key, value]) => {
                    setCSSVariable(key, value)
                })
            }
        }
    }, [colorTheme, resolvedTheme])

    return (
        <Select defaultValue="slate" onValueChange={(value) => setColorTheme(value as ThemeType)}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select a color theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className='translate-x-[-25px]'>Color Themes</SelectLabel>
                    <SelectSeparator />
                    {THEMES.map((theme) => (
                        <SelectItem value={theme} key={theme}>
                            {`${theme.charAt(0).toUpperCase()}${theme.slice(1)}`}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
