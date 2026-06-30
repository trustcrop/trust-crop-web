'use client'

type Props = {
    colorMode: 'dark' | 'light'
    title: string
    description: string
}

const DARK = {
    bg: '#0d1117',
    border: 'rgba(255,255,255,0.08)',
    label: 'rgba(255,255,255,0.45)',
    dot: '#4ade80',
    fields: [
        {fill: 'rgba(46,164,78,0.55)',   stroke: '#2da44e', label: '\u0395\u03bb\u03b9\u03ac'},
        {fill: 'rgba(74,222,128,0.40)',  stroke: '#4ade80', label: '\u03a3\u03b9\u03c4\u03ac\u03c1\u03b9'},
        {fill: 'rgba(134,239,172,0.38)', stroke: '#86efac', label: '\u0391\u03bc\u03c0\u03ad\u03bb\u03b9'},
        {fill: 'rgba(22,101,52,0.65)',   stroke: '#166534', label: '\u0391\u03c1\u03b1\u03c0\u03cc\u03c3\u03b9\u03c4\u03b1'},
        {fill: 'rgba(52,211,153,0.40)',  stroke: '#34d399', label: '\u039a\u03b7\u03c0\u03b5\u03c5\u03c4\u03b9\u03ba\u03ac'},
        {fill: 'rgba(187,247,208,0.35)', stroke: '#6ee7a0', label: '\u0392\u03b1\u03bc\u03b2\u03ac\u03ba\u03b9'},
    ],
}

const LIGHT = {
    bg: '#f0f4f0',
    border: 'rgba(0,0,0,0.10)',
    label: 'rgba(0,0,0,0.40)',
    dot: '#0969da',
    fields: [
        {fill: 'rgba(46,164,78,0.30)',  stroke: '#2da44e', label: '\u0395\u03bb\u03b9\u03ac'},
        {fill: 'rgba(202,138,4,0.28)',  stroke: '#92400e', label: '\u03a3\u03b9\u03c4\u03ac\u03c1\u03b9'},
        {fill: 'rgba(22,163,74,0.28)',  stroke: '#15803d', label: '\u0391\u03bc\u03c0\u03ad\u03bb\u03b9'},
        {fill: 'rgba(234,88,12,0.25)',  stroke: '#c2410c', label: '\u0391\u03c1\u03b1\u03c0\u03cc\u03c3\u03b9\u03c4\u03b1'},
        {fill: 'rgba(79,70,229,0.22)',  stroke: '#4338ca', label: '\u039a\u03b7\u03c0\u03b5\u03c5\u03c4\u03b9\u03ba\u03ac'},
        {fill: 'rgba(13,148,136,0.25)', stroke: '#0f766e', label: '\u0392\u03b1\u03bc\u03b2\u03ac\u03ba\u03b9'},
    ],
}

// Field polygon paths (viewBox 0 0 640 380)
const FIELDS = [
    'M 38,32 L 178,24 L 194,118 L 148,148 L 42,138 Z',
    'M 212,18 L 372,22 L 382,108 L 204,122 Z',
    'M 396,24 L 560,32 L 552,148 L 388,156 Z',
    'M 52,162 L 186,156 L 202,258 L 168,292 L 58,282 Z',
    'M 220,132 L 374,128 L 388,268 L 214,276 Z',
    'M 404,168 L 554,162 L 558,292 L 398,298 Z',
]


export function GeoMapCard({colorMode, title, description}: Props) {
    const t = colorMode === 'dark' ? DARK : LIGHT
    const textShadow = colorMode === 'dark' ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)'

    return (
        <div style={{position: 'relative', width: '100%', borderRadius: 12, overflow: 'hidden', lineHeight: 0}}>
            <svg
                viewBox="0 0 640 380"
                style={{width: '100%', height: 'auto', display: 'block', background: t.bg}}
                xmlns="http://www.w3.org/2000/svg"
            >

                {/* Fields */}
                {FIELDS.map((d, i) => (
                    <path
                        key={i}
                        d={d}
                        fill={t.fields[i].fill}
                        stroke={t.fields[i].stroke}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                ))}


                {/* Selected pin */}
                <circle cx="88" cy="88" r="4" fill={t.dot} stroke={t.bg} strokeWidth="1.5"/>

                {/* Compass */}
                <g transform="translate(608,24)">
                    <circle r="12" fill={t.bg} stroke={t.border} strokeWidth="1"/>
                    <text textAnchor="middle" y="-3" fill={t.label} fontSize="7" fontFamily="system-ui" fontWeight="700">N</text>
                    <line x1="0" y1="-8" x2="0" y2="8" stroke={t.label} strokeWidth="0.8"/>
                    <line x1="-8" y1="0" x2="8" y2="0" stroke={t.label} strokeWidth="0.8"/>
                </g>

                {/* Scale bar */}
                <g transform="translate(20,356)">
                    <line x1="0" y1="0" x2="40" y2="0" stroke={t.label} strokeWidth="1.5"/>
                    <line x1="0" y1="-3" x2="0" y2="3" stroke={t.label} strokeWidth="1.5"/>
                    <line x1="40" y1="-3" x2="40" y2="3" stroke={t.label} strokeWidth="1.5"/>
                    <text x="20" y="-6" textAnchor="middle" fill={t.label} fontSize="7" fontFamily="system-ui">500m</text>
                </g>

                {/* Coord watermark */}
                <text x="620" y="374" textAnchor="end" fill={t.label} fontSize="7" fontFamily="monospace" opacity="0.6">37.9° N / 22.4° E</text>
            </svg>

            {/* Text overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                borderRadius: 12,
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.10) 40%, transparent 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '24px 28px',
            }}>
                <span style={{color: '#fff', fontWeight: 700, fontSize: 22, lineHeight: 1.2, marginBottom: 6, textShadow}}>{title}</span>
                <span style={{color: 'rgba(255,255,255,0.80)', fontSize: 14, lineHeight: 1.5, textShadow}}>{description}</span>
            </div>
        </div>
    )
}

