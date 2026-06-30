'use client'

import { useEffect, useRef } from 'react'

const SIZE = 260
const CX   = SIZE / 2   // 130
const CY   = SIZE / 2   // 130
const RX   = 110
const RY   = 34

// dur in ms, phase = how far into the loop each dot starts (creates the stagger)
const ORBITS = [
    { angle:   0, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              dur: 3200, phase:    0 },
    { angle:  45, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', dur: 4400, phase: 1100 },
    { angle:  90, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              dur: 3800, phase: 1900 },
    { angle: 135, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', dur: 5000, phase: 2500 },
]

export function GeometricAccent() {
    const dotRefs = useRef<(SVGCircleElement | null)[]>(ORBITS.map(() => null))
    const rafRef  = useRef<number>(0)

    useEffect(() => {
        // Respect reduced-motion preference
        if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

        const start = performance.now()

        function tick(now: number) {
            ORBITS.forEach(({ dur, phase }, i) => {
                const el = dotRefs.current[i]
                if (!el) return
                const t = ((now - start + phase) % dur) / dur
                const angle = t * 2 * Math.PI
                el.setAttribute('cx', String(CX + RX * Math.cos(angle)))
                el.setAttribute('cy', String(CY + RY * Math.sin(angle)))
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
                {ORBITS.map(({ angle, stroke, dotR, dotFill }, i) => (
                    <g key={angle} transform={`rotate(${angle}, ${CX}, ${CY})`}>
                        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} stroke={stroke} strokeWidth="1.5" />
                        <circle
                            ref={el => { dotRefs.current[i] = el }}
                            cx={CX}
                            cy={CY}
                            r={dotR}
                            fill={dotFill}
                        />
                    </g>
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




