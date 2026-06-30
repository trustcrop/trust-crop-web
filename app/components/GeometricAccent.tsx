'use client'

const SIZE = 260
const CX   = SIZE / 2
const CY   = SIZE / 2
const RX   = 110
const RY   = 34

// Ellipse path for animateMotion — traced in the group's local (pre-rotation) space
const ELLIPSE_PATH =
    `M ${CX - RX},${CY} A ${RX},${RY} 0 1,0 ${CX + RX},${CY} A ${RX},${RY} 0 1,0 ${CX - RX},${CY} Z`

const ORBITS = [
    { angle:   0, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              dur: '3.2s', begin: '0s'    },
    { angle:  45, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', dur: '4.4s', begin: '-1.1s' },
    { angle:  90, stroke: 'rgba(46,164,78,0.62)', dotR: 6,   dotFill: '#2da44e',              dur: '3.8s', begin: '-1.9s' },
    { angle: 135, stroke: 'rgba(46,164,78,0.46)', dotR: 5.5, dotFill: 'rgba(46,164,78,0.88)', dur: '5.0s', begin: '-2.5s' },
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
                {ORBITS.map(({ angle, stroke, dotR, dotFill, dur, begin }) => (
                    <g key={angle} transform={`rotate(${angle}, ${CX}, ${CY})`}>
                        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} stroke={stroke} strokeWidth="1.5" />
                        {/*
                          CSS Motion Path drives the dot along ELLIPSE_PATH. The path lives
                          in the group's local (pre-rotation) space, matching offset-path's
                          coordinate system, so each orbit still inherits its parent rotation.
                        */}
                        <circle
                            className="geo-dot"
                            r={dotR}
                            fill={dotFill}
                            style={{
                                '--geo-path': `path('${ELLIPSE_PATH}')`,
                                animationDuration: dur,
                                animationDelay: begin,
                            } as React.CSSProperties}
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
