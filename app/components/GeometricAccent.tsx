'use client'

const SIZE  = 260
const CX    = SIZE / 2   // 130
const CY    = SIZE / 2   // 130
const RX    = 110
const RY    = 34
const STEPS = 60         // keyframe resolution — enough for a smooth ellipse

const ORBITS = [
    { angle:   0, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              durMs: 3200, phaseMs:    0 },
    { angle:  45, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', durMs: 4400, phaseMs: 1100 },
    { angle:  90, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              durMs: 3800, phaseMs: 1900 },
    { angle: 135, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', durMs: 5000, phaseMs: 2500 },
]

/**
 * Build a @keyframes rule whose frames translate a circle placed at (CX,CY)
 * along the tilted ellipse for orbit `id`.
 * Using translate() so transform-origin is irrelevant — pure offset.
 */
function buildKeyframes(id: number, angle: number): string {
    const rad  = (angle * Math.PI) / 180
    const cosA = Math.cos(rad)
    const sinA = Math.sin(rad)
    const frames: string[] = [`@keyframes _geo${id}{`]
    for (let s = 0; s <= STEPS; s++) {
        const θ  = (s / STEPS) * 2 * Math.PI
        const lx = RX * Math.cos(θ)
        const ly = RY * Math.sin(θ)
        // rotate the local ellipse point by the orbit tilt
        const tx = (lx * cosA - ly * sinA).toFixed(2)
        const ty = (lx * sinA + ly * cosA).toFixed(2)
        const p  = Math.round((s / STEPS) * 100)
        frames.push(`${p}%{transform:translate(${tx}px,${ty}px)}`)
    }
    frames.push('}')
    return frames.join('')
}

// All inputs are module-level constants → computed once at load time, same on
// server and client so no hydration mismatch.
const KEYFRAMES_CSS =
    ORBITS.map(({ angle }, i) => buildKeyframes(i, angle)).join('') +
    '@media(prefers-reduced-motion:reduce){.geo-dot{animation:none!important}}'

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
                {/* Inject keyframes directly into the SVG — valid in inline SVG */}
                {/* eslint-disable-next-line react/no-danger */}
                <style dangerouslySetInnerHTML={{ __html: KEYFRAMES_CSS }} />

                {/* Static orbit ellipses */}
                {ORBITS.map(({ angle, stroke }) => (
                    <g key={angle} transform={`rotate(${angle}, ${CX}, ${CY})`}>
                        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} stroke={stroke} strokeWidth="1.5" />
                    </g>
                ))}

                {/*
                  Animated dots. Each circle sits at (CX, CY); the CSS keyframes
                  apply translate() offsets to move them along the orbit path.
                  Negative animation-delay starts the dot mid-cycle (same effect
                  as the original SMIL negative `begin` values).
                */}
                {ORBITS.map(({ angle, dotR, dotFill, durMs, phaseMs }, i) => (
                    <circle
                        key={`dot-${angle}`}
                        className="geo-dot"
                        cx={CX}
                        cy={CY}
                        r={dotR}
                        fill={dotFill}
                        style={{
                            animation: `_geo${i} ${durMs}ms linear -${phaseMs}ms infinite`,
                        }}
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
