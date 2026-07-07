'use client'

import dynamic from 'next/dynamic'

// Load the animated SVG only on the client — it uses rAF/useEffect
const GeometricAccent = dynamic(
    () => import('./GeometricAccent').then(m => ({ default: m.GeometricAccent })),
    { ssr: false, loading: () => <div style={{ width: 260, height: 260 }} aria-hidden="true" /> }
)

export function GeometricAccentLazy() {
    return <GeometricAccent />
}

