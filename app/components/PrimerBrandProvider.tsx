'use client'

import { type ReactNode } from 'react'
import { ThemeProvider } from '@primer/react-brand'

interface PrimerBrandProviderProps {
  readonly children: ReactNode
}

/**
 * Client-side wrapper for Primer Brand's ThemeProvider.
 * Always renders in dark color mode.
 */
export function PrimerBrandProvider({ children }: PrimerBrandProviderProps) {
  return <ThemeProvider colorMode="dark">{children}</ThemeProvider>
}
