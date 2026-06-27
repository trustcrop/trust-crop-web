'use client'

import {createContext, useContext, useState, useEffect, useMemo, startTransition, type ReactNode} from 'react'

type ColorMode = 'light' | 'dark'

interface ThemeCtx {
    readonly colorMode: ColorMode
    readonly toggle: () => void
}

const ThemeContext = createContext<ThemeCtx>({colorMode: 'dark', toggle: () => {}})

export function ThemeContextProvider({children}: {readonly children: ReactNode}) {
    const [colorMode, setColorMode] = useState<ColorMode>('dark')

    // Initialise from localStorage or system preference
    useEffect(() => {
        const stored = localStorage.getItem('tc-theme') as ColorMode | null
        startTransition(() => {
            if (stored === 'light' || stored === 'dark') {
                setColorMode(stored)
            } else {
                const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
                setColorMode(prefersDark ? 'dark' : 'light')
            }
        })
    }, [])

    // Sync data attribute + storage whenever mode changes
    useEffect(() => {
        document.documentElement.dataset.colorMode = colorMode
        localStorage.setItem('tc-theme', colorMode)
    }, [colorMode])

    const toggle = () => setColorMode(prev => (prev === 'dark' ? 'light' : 'dark'))

    const value = useMemo(() => ({colorMode, toggle}), [colorMode])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
