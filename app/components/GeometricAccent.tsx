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

const ORBIT_CONSTS = ORBITS.map(({ angle, durMs, phaseMs }) => {
    const rad = (angle * Math.PI) / 180
    return { cosA: Math.cos(rad), sinA: Math.sin(rad), durMs, phaseMs }
})

export function GeometricAccent() {
    // Refs point to <g> wrappers — we set their `transform` attribute each frame.
    // Animating a group's transform is more reliable on iOS Safari than mutating
    // cx/cy on a circle inside a filtered SVG.
    const groupsRef = useRef<(SVGGElement | null)[]>([])

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const start = performance.now()
        let raf: number

        function tick(now: number) {
            const elapsed = now - start
            for (let i = 0; i < ORBIT_CONSTS.length; i++) {
                const el = groupsRef.current[i]
                if (!el) continue
                const { cosA, sinA, durMs, phaseMs } = ORBIT_CONSTS[i]
                const θ = ((elapsed + phaseMs) % durMs) / durMs * (2 * Math.PI)
                const lx = RX * Math.cos(θ)
                const ly = RY * Math.sin(θ)
                const x = (CX + lx * cosA - ly * sinA).toFixed(2)
                const y = (CY + lx * sinA + ly * cosA).toFixed(2)
                el.setAttribute('transform', `translate(${x},${y})`)
            }
            raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    return (
        <div className="geo-accent" aria-hidden="true">
            {/*
              Filter lives on this div, NOT on the SVG.
              iOS Safari composites filtered SVGs as a frozen bitmap — any JS
              mutations inside a filtered SVG are silently dropped. Moving the
              filter to an outer div keeps the SVG content live.
            */}
            <div className="geo-accent-filter">
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

                    {/*
                      Each dot lives inside a <g> that rAF repositions via
                      transform="translate(x,y)". The circle stays at (0,0)
                      in its local space — only the group moves.
                    */}
                    {ORBITS.map(({ angle, dotR, dotFill }, i) => (
                        <g
                            key={`dot-${angle}`}
                            ref={el => { groupsRef.current[i] = el }}
                            transform={`translate(${CX},${CY})`}
                        >
                            <circle cx={0} cy={0} r={dotR} fill={dotFill} />
                        </g>
                    ))}

                    {/* Central leaf */}
                    <g transform={`translate(${CX}, ${CY})`}>
                        <path d="M0,-18 C15,-18 22,0 0,18 C-22,0 -15,-18 0,-18 Z" fill="#2da44e" opacity="0.93" />
                        <line x1="0" y1="-15" x2="0" y2="15" stroke="#1a7a30" strokeWidth="1.2" strokeLinecap="round" />
                    </g>
                </svg>
            </div>
        </div>
    )
}
