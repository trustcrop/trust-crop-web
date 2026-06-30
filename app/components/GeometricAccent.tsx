'use client'

const SIZE = 260
const CX   = SIZE / 2
const CY   = SIZE / 2
const RX   = 110
const RY   = 34

// Orbits: each dot lives at the SVG centre (CX,CY) and is moved by a CSS
// @keyframes translate along the ellipse.  The <g> rotation tilts the whole
// orbit plane.  Negative animation-delay starts the dot mid-loop so all four
// are staggered — CSS delays work correctly on iOS Safari unlike SMIL begin.
const ORBITS = [
    { angle:   0, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              dur: '3.2s', delay: '0s'    },
    { angle:  45, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', dur: '4.4s', delay: '-1.1s' },
    { angle:  90, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              dur: '3.8s', delay: '-1.9s' },
    { angle: 135, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', dur: '5.0s', delay: '-2.5s' },
]

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
                {ORBITS.map(({ angle, stroke, dotR, dotFill, dur, delay }) => (
                    <g key={angle} transform={`rotate(${angle}, ${CX}, ${CY})`}>
                        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} stroke={stroke} strokeWidth="1.5" />
                        {/* cx/cy at centre; CSS translate drives the orbit — no SMIL needed */}
                        <circle
                            cx={CX}
                            cy={CY}
                            r={dotR}
                            fill={dotFill}
                            style={{
                                animation: `orbit-dot ${dur} linear ${delay} infinite`,
                                willChange: 'transform',
                            }}
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
