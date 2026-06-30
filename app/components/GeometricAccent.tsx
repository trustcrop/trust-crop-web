'use client'

import { useEffect, useRef } from 'react'

const SIZE = 260
const CX   = SIZE / 2
const CY   = SIZE / 2
const RX   = 110
const RY   = 34

// Each orbit: visual properties + animation period (ms) + initial phase offset (ms).
// phaseMs replicates the negative SMIL `begin` (e.g. begin="-1.1s" → phaseMs=1100).
const ORBITS = [
    { angle:   0, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              durMs: 3200, phaseMs:    0 },
    { angle:  45, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', durMs: 4400, phaseMs: 1100 },
    { angle:  90, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              durMs: 3800, phaseMs: 1900 },
    { angle: 135, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', durMs: 5000, phaseMs: 2500 },
]

export function GeometricAccent() {
    const dotRefs = useRef<(SVGCircleElement | null)[]>([])
    const rafRef  = useRef<number>(0)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const start = performance.now()

        const tick = (now: number) => {
            const elapsed = now - start

            ORBITS.forEach(({ angle, durMs, phaseMs }, i) => {
                const dot = dotRefs.current[i]
                if (!dot) return

                // Parametric position on the ellipse in its own (pre-rotation) space
                const t  = ((elapsed + phaseMs) % durMs) / durMs
                const θ  = t * 2 * Math.PI
                const lx = CX + RX * Math.cos(θ)
                const ly = CY + RY * Math.sin(θ)

                // Rotate the local position around (CX, CY) by the orbit's tilt angle
                const rad = (angle * Math.PI) / 180
                const dx  = lx - CX
                const dy  = ly - CY
                dot.setAttribute('cx', String(CX + dx * Math.cos(rad) - dy * Math.sin(rad)))
                dot.setAttribute('cy', String(CY + dx * Math.sin(rad) + dy * Math.cos(rad)))
            })

            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    return (
        <div className="geo-accent" aria-hidden="true">
            <svg
                className="geo-orbits"
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Static orbit ellipses */}
                {ORBITS.map(({ angle, stroke }) => (
                    <g key={angle} transform={`rotate(${angle}, ${CX}, ${CY})`}>
                        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} stroke={stroke} strokeWidth="1.5" />
                    </g>
                ))}

                {/* Animated dots — positioned in full SVG space by the RAF loop */}
                {ORBITS.map(({ dotR, dotFill, angle }, i) => (
                    <circle
                        key={angle}
                        ref={el => { dotRefs.current[i] = el }}
                        cx={CX + RX}
                        cy={CY}
                        r={dotR}
                        fill={dotFill}
                    />
                ))}

                {/* Central leaf */}
                <g transform={`translate(${CX}, ${CY})`}>
                    <path d="M0,-18 C15,-18 22,0 0,18 C-22,0 -15,-18 0,-18 Z" fill="#2da44e" opacity="0.93" />
                    <line x1="0" y1="-15" x2="0" y2="15" stroke="#1a7a30" strokeWidth="1.2" strokeLinecap="round" />
                </g>
            </svg>
        </div>
    )
}
