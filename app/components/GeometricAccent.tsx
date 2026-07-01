'use client'

import { useEffect, useRef } from 'react'

const SIZE  = 260
const CX    = SIZE / 2
const CY    = SIZE / 2
const RX    = 110
const RY    = 34

const ORBITS = [
    { angle:   0, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              durMs: 3200, phaseMs:    0 },
    { angle:  45, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', durMs: 4400, phaseMs: 1100 },
    { angle:  90, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              durMs: 3800, phaseMs: 1900 },
    { angle: 135, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', durMs: 5000, phaseMs: 2500 },
]

// Pre-compute per-orbit rotation constants so the rAF loop does minimal work
const ORBIT_CONSTS = ORBITS.map(({ angle, durMs, phaseMs }) => {
    const rad = (angle * Math.PI) / 180
    return { cosA: Math.cos(rad), sinA: Math.sin(rad), durMs, phaseMs }
})

export function GeometricAccent() {
    const dotsRef = useRef<(SVGCircleElement | null)[]>([])

    useEffect(() => {
        // Respect reduced-motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const start = performance.now()
        let raf: number

        function tick(now: number) {
            const elapsed = now - start
            for (let i = 0; i < ORBIT_CONSTS.length; i++) {
                const el = dotsRef.current[i]
                if (!el) continue
                const { cosA, sinA, durMs, phaseMs } = ORBIT_CONSTS[i]
                const θ = ((elapsed + phaseMs) % durMs) / durMs * (2 * Math.PI)
                const lx = RX * Math.cos(θ)
                const ly = RY * Math.sin(θ)
                el.setAttribute('cx', (CX + lx * cosA - ly * sinA).toFixed(2))
                el.setAttribute('cy', (CY + lx * sinA + ly * cosA).toFixed(2))
            }
            raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
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

                {/* Dots — positioned at centre on first render, rAF moves them */}
                {ORBITS.map(({ angle, dotR, dotFill }, i) => (
                    <circle
                        key={`dot-${angle}`}
                        ref={el => { dotsRef.current[i] = el }}
                        cx={CX}
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
