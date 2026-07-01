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

/** Absolute cx/cy positions along the tilted ellipse for a given orbit. */
function buildCxCy(angle: number): { cxValues: string; cyValues: string } {
    const rad  = (angle * Math.PI) / 180
    const cosA = Math.cos(rad)
    const sinA = Math.sin(rad)
    const cxPts: string[] = []
    const cyPts: string[] = []
    for (let s = 0; s <= STEPS; s++) {
        const θ  = (s / STEPS) * 2 * Math.PI
        const lx = RX * Math.cos(θ)
        const ly = RY * Math.sin(θ)
        cxPts.push((CX + lx * cosA - ly * sinA).toFixed(2))
        cyPts.push((CY + lx * sinA + ly * cosA).toFixed(2))
    }
    return { cxValues: cxPts.join(';'), cyValues: cyPts.join(';') }
}

// Pre-compute at module load — identical on server & client, no hydration mismatch
const ORBIT_PATHS = ORBITS.map(({ angle }) => buildCxCy(angle))

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
                  Dots: animate cx and cy attributes directly — the most
                  universally compatible SMIL approach. Works on iOS Safari,
                  Android, and desktop without any CSS or transform tricks.
                  Negative begin offsets start each dot mid-cycle.
                */}
                {ORBITS.map(({ angle, dotR, dotFill, durMs, phaseMs }, i) => {
                    const { cxValues, cyValues } = ORBIT_PATHS[i]
                    const durStr = `${durMs}ms`
                    const beginStr = phaseMs > 0 ? `-${phaseMs}ms` : '0ms'
                    return (
                        <circle key={`dot-${angle}`} cx={CX} cy={CY} r={dotR} fill={dotFill}>
                            <animate
                                attributeName="cx"
                                values={cxValues}
                                dur={durStr}
                                begin={beginStr}
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                            <animate
                                attributeName="cy"
                                values={cyValues}
                                dur={durStr}
                                begin={beginStr}
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </circle>
                    )
                })}

                {/* Central leaf */}
                <g transform={`translate(${CX}, ${CY})`}>
                    <path d="M0,-18 C15,-18 22,0 0,18 C-22,0 -15,-18 0,-18 Z" fill="#2da44e" opacity="0.93" />
                    <line x1="0" y1="-15" x2="0" y2="15" stroke="#1a7a30" strokeWidth="1.2" strokeLinecap="round" />
                </g>
            </svg>
        </div>
    )
}
