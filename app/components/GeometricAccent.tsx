'use client'

const SIZE  = 260
const CX    = SIZE / 2   // 130
const CY    = SIZE / 2   // 130
const RX    = 110
const RY    = 34
const STEPS = 60

const ORBITS = [
    { angle:   0, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              durMs: 3200, phaseMs:    0 },
    { angle:  45, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', durMs: 4400, phaseMs: 1100 },
    { angle:  90, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              durMs: 3800, phaseMs: 1900 },
    { angle: 135, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', durMs: 5000, phaseMs: 2500 },
]

/**
 * Build the SMIL `values` string for <animateTransform type="translate">
 * Each step is "tx,ty" separated by semicolons.
 * Using SMIL instead of CSS @keyframes because CSS transform on SVG elements
 * is silently broken on iOS Safari — SMIL runs in the SVG engine and works
 * everywhere without any prefixes.
 */
function buildSmilValues(angle: number): string {
    const rad  = (angle * Math.PI) / 180
    const cosA = Math.cos(rad)
    const sinA = Math.sin(rad)
    const pts: string[] = []
    for (let s = 0; s <= STEPS; s++) {
        const θ  = (s / STEPS) * 2 * Math.PI
        const lx = RX * Math.cos(θ)
        const ly = RY * Math.sin(θ)
        const tx = (lx * cosA - ly * sinA).toFixed(2)
        const ty = (lx * sinA + ly * cosA).toFixed(2)
        pts.push(`${tx},${ty}`)
    }
    return pts.join(';')
}

// Pre-compute at module load — same on server & client, no hydration mismatch
const SMIL_VALUES = ORBITS.map(({ angle }) => buildSmilValues(angle))

export function GeometricAccent() {
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

                {/*
                  Animated dots using SMIL <animateTransform>.
                  The circle sits at (CX,CY); SMIL translates it along the orbit.
                  Negative `begin` starts the dot mid-cycle (same as CSS negative delay).
                  SMIL is natively handled by the SVG engine on every platform —
                  no CSS, no -webkit- hacks needed.
                */}
                {ORBITS.map(({ angle, dotR, dotFill, durMs, phaseMs }, i) => (
                    <circle key={`dot-${angle}`} cx={CX} cy={CY} r={dotR} fill={dotFill}>
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values={SMIL_VALUES[i]}
                            dur={`${durMs}ms`}
                            begin={`-${phaseMs}ms`}
                            repeatCount="indefinite"
                            calcMode="linear"
                        />
                    </circle>
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
