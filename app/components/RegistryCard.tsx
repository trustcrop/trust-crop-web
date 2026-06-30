'use client'

type Props = {readonly colorMode: 'dark' | 'light'; readonly title: string; readonly description: string}

const DARK  = {bg:'#0d1117', rowAlt:'rgba(255,255,255,0.025)', rowSel:'rgba(46,164,78,0.08)', border:'rgba(255,255,255,0.07)', text:'rgba(255,255,255,0.80)', muted:'rgba(255,255,255,0.30)', barBg:'rgba(255,255,255,0.08)'}
const LIGHT = {bg:'#f6f9f6', rowAlt:'rgba(0,0,0,0.025)',       rowSel:'rgba(46,164,78,0.06)', border:'rgba(0,0,0,0.08)',       text:'rgba(0,0,0,0.78)',       muted:'rgba(0,0,0,0.28)',       barBg:'rgba(0,0,0,0.08)'}

// Shape renderers (cx, cy) — all circles, color-coded by category
const SHAPE = {
    circle:  (cx: number, cy: number, c: string) => <circle cx={cx} cy={cy} r={11} fill={c} fillOpacity={0.88}/>,
    hexagon: (cx: number, cy: number, c: string) => <circle cx={cx} cy={cy} r={11} fill={c} fillOpacity={0.88}/>,
    diamond: (cx: number, cy: number, c: string) => <circle cx={cx} cy={cy} r={11} fill={c} fillOpacity={0.88}/>,
    square:  (cx: number, cy: number, c: string) => <circle cx={cx} cy={cy} r={11} fill={c} fillOpacity={0.88}/>,
    triangle:(cx: number, cy: number, c: string) => <circle cx={cx} cy={cy} r={11} fill={c} fillOpacity={0.88}/>,
}

const ROWS = [
    {code:'SK-4821', shape:'circle'  as const, color:'#2da44e', bar:0.72, bar2:0.48, dots:['#4ade80','#86efac','#34d399']},
    {code:'CX-1204', shape:'hexagon' as const, color:'#4ade80', bar:0.58, bar2:0.35, dots:['#2da44e','#6ee7a0'],         sel: true},
    {code:'TR-7733', shape:'diamond' as const, color:'#86efac', bar:0.84, bar2:0.6,  dots:['#34d399','#a7f3c5']},
    {code:'DX-0916', shape:'square'  as const, color:'#34d399', bar:0.45, bar2:0.28, dots:['#2da44e','#4ade80','#86efac']},
    {code:'MX-3350', shape:'triangle'as const, color:'#6ee7a0', bar:0.66, bar2:0.42, dots:['#34d399','#4ade80']},
]

// Column x anchors
const CX = {num:52, code:130, shape:340, bar:450, dots:1120}
const BAR_W = 580
const ROW_H = 38
const Y0    = 56   // first row top
const HDR_Y = 30

export function RegistryCard({colorMode, title, description}: Props) {
    const t = colorMode === 'dark' ? DARK : LIGHT
    const textShadow = colorMode === 'dark' ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)'

    return (
        <div style={{position:'relative', width:'100%', borderRadius:12, overflow:'hidden', lineHeight:0}}>
            <svg viewBox="0 0 1280 260" style={{width:'100%', height:'auto', display:'block', background:t.bg}} xmlns="http://www.w3.org/2000/svg">

                {/* Header labels — minimal */}
                <text x={CX.num}   y={HDR_Y} textAnchor="middle" fill={t.muted} fontSize="9" fontWeight="600" fontFamily="system-ui">#</text>
                <text x={CX.code}  y={HDR_Y} fill={t.muted} fontSize="9" fontWeight="600" fontFamily="system-ui">ID</text>
                <text x={CX.shape} y={HDR_Y} textAnchor="middle" fill={t.muted} fontSize="9" fontWeight="600" fontFamily="system-ui">CAT</text>
                <text x={CX.bar}   y={HDR_Y} fill={t.muted} fontSize="9" fontWeight="600" fontFamily="system-ui">METRIC</text>
                <text x={CX.dots}  y={HDR_Y} textAnchor="middle" fill={t.muted} fontSize="9" fontWeight="600" fontFamily="system-ui">CROPS</text>

                {/* Header divider */}
                <line x1="24" y1="37" x2="1256" y2="37" stroke={t.border} strokeWidth="1"/>

                {/* Rows */}
                {ROWS.map((row, i) => {
                    const ry  = Y0 + i * ROW_H
                    const cy  = ry + ROW_H / 2
                    const bg  = row.sel ? t.rowSel : i % 2 === 1 ? t.rowAlt : 'none'

                    return (
                        <g key={row.code}>
                            {bg !== 'none' && <rect x="0" y={ry} width="1280" height={ROW_H} fill={bg}/>}

                            {/* # */}
                            <text x={CX.num} y={cy + 4} textAnchor="middle" fill={t.muted} fontSize="10" fontFamily="system-ui">{String(i + 1).padStart(2,'0')}</text>

                            {/* Code */}
                            <text x={CX.code} y={cy + 4} fill={t.text} fontSize="11" fontWeight="500" fontFamily="monospace">{row.code}</text>

                            {/* Shape icon (category) */}
                            {SHAPE[row.shape](CX.shape, cy, row.color)}

                            {/* Double bar (metric) */}
                            <rect x={CX.bar} y={cy - 8} width={BAR_W} height={7} rx={3} fill={t.barBg}/>
                            <rect x={CX.bar} y={cy - 8} width={BAR_W * row.bar} height={7} rx={3} fill={row.color} opacity={0.7}/>
                            <rect x={CX.bar} y={cy + 2} width={BAR_W} height={5} rx={3} fill={t.barBg}/>
                            <rect x={CX.bar} y={cy + 2} width={BAR_W * row.bar2} height={5} rx={3} fill={row.color} opacity={0.35}/>

                            {/* Crop dots */}
                            {row.dots.map((dc, di) => {
                                const totalW = row.dots.length * 12 - 2
                                return <circle key={dc + String(di)} cx={CX.dots - totalW / 2 + di * 12 + 5} cy={cy} r={4} fill={dc} opacity={0.85}/>
                            })}

                            {/* Row divider */}
                            <line x1="24" y1={ry + ROW_H} x2="1256" y2={ry + ROW_H} stroke={t.border} strokeWidth="0.5"/>
                        </g>
                    )
                })}
            </svg>

            {/* Text overlay */}
            <div style={{
                position:'absolute', inset:0, borderRadius:12,
                fontFamily:'var(--font-inter), system-ui, sans-serif',
                background:'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 35%, transparent 100%)',
                display:'flex', flexDirection:'column', justifyContent:'flex-end',
                padding:'18px 28px',
            }}>
                <span style={{color:'#fff', fontWeight:700, fontSize:22, lineHeight:1.2, marginBottom:4, textShadow}}>{title}</span>
                <span style={{color:'rgba(255,255,255,0.80)', fontSize:14, lineHeight:1.5, textShadow}}>{description}</span>
            </div>
        </div>
    )
}


