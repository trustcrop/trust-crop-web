'use client'

import { type ReactNode } from 'react'
import { ThemeProvider } from '@primer/react-brand'
import { ThemeContextProvider, useTheme } from './ThemeContext'

/** Inner wrapper — reads colorMode from context and passes it to Primer Brand */
function BrandThemeWrapper({ children }: { children: ReactNode }) {
  const { colorMode } = useTheme()
  return <ThemeProvider colorMode={colorMode}>{children}</ThemeProvider>
}

/**
 * Client-side wrapper for Primer Brand's ThemeProvider.
 * Supports light / dark toggle, persisted to localStorage.
 */
export function PrimerBrandProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <BrandThemeWrapper>{children}</BrandThemeWrapper>
    </ThemeContextProvider>
  )
}
