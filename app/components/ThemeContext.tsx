'use client'

import {createContext, useContext, useEffect, useMemo, type ReactNode} from 'react'

type ColorMode = 'light' | 'dark'

interface ThemeCtx {
    readonly colorMode: ColorMode
    readonly toggle: () => void
}

const ThemeContext = createContext<ThemeCtx>({colorMode: 'dark', toggle: () => {}})

export function ThemeContextProvider({children}: {readonly children: ReactNode}) {
    // Always dark — theme toggle is disabled site-wide
    useEffect(() => {
        document.documentElement.dataset.colorMode = 'dark'
        localStorage.setItem('tc-theme', 'dark')
    }, [])

    const value = useMemo(() => ({colorMode: 'dark' as ColorMode, toggle: () => {}}), [])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
