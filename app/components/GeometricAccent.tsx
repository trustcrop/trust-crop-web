'use client'

/**
 * GeometricAccent
 * A small, minimal geometric animation rendered in green tones.
 * Pure SVG + CSS keyframes (see globals.css) — no external dependencies.
 */
export function GeometricAccent() {
    return (
        <div className="geo-accent" aria-hidden="true">
            <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer rotating square */}
                <rect
                    className="geo-square-outer"
                    x="18"
                    y="18"
                    width="60"
                    height="60"
                    rx="10"
                    stroke="#2da44e"
                    strokeWidth="2"
                />
                {/* Inner counter-rotating square */}
                <rect
                    className="geo-square-inner"
                    x="30"
                    y="30"
                    width="36"
                    height="36"
                    rx="6"
                    stroke="#3fb950"
                    strokeWidth="2"
                />
                {/* Pulsing center dot */}
                <circle className="geo-dot" cx="48" cy="48" r="6" fill="#2da44e"/>

                {/* Orbiting satellite dots */}
                <g className="geo-orbit">
                    <circle cx="48" cy="12" r="3.5" fill="#57d364"/>
                    <circle cx="48" cy="84" r="3.5" fill="#46954a"/>
                </g>
            </svg>
        </div>
    )
}

