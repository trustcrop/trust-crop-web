'use client'

type Props = {readonly colorMode: 'dark' | 'light'; readonly title: string; readonly description: string}
type Cell = {d: number | null; t?: string[]}

const DARK  = {bg:'#0d1117', surface:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.07)', text:'rgba(255,255,255,0.82)', muted:'rgba(255,255,255,0.32)', accent:'#3fb950'}
const LIGHT = {bg:'#f6f9f6', surface:'rgba(0,0,0,0.03)',       border:'rgba(0,0,0,0.08)',       text:'rgba(0,0,0,0.78)',       muted:'rgba(0,0,0,0.36)',       accent:'#1a7a30'}

const TASK_COLOR: Record<string, {dark: string; light: string}> = {
    w: {dark:'#4ade80', light:'#16a34a'},  // irrigation
    s: {dark:'#2da44e', light:'#15803d'},  // spray
    f: {dark:'#86efac', light:'#22c55e'},  // fertilize
    h: {dark:'#34d399', light:'#059669'},  // harvest
}

// July 2025 — starts on Tuesday (Mon=0 → offset 1)
const WEEKS: Cell[][] = [
    [{d:null},{d:1},{d:2},{d:3,t:['w']},{d:4},{d:5},{d:6}],
    [{d:7,t:['s']},{d:8},{d:9},{d:10,t:['w']},{d:11},{d:12,t:['f']},{d:13}],
    [{d:14},{d:15,t:['h']},{d:16,t:['h']},{d:17,t:['h','w']},{d:18,t:['h']},{d:19,t:['h']},{d:20}],
    [{d:21,t:['s']},{d:22},{d:23},{d:24,t:['w']},{d:25},{d:26,t:['f']},{d:27}],
    [{d:28},{d:29},{d:30},{d:31},{d:null},{d:null},{d:null}],
]

// Greek day abbreviations as unicode escapes
const DAY_LABELS = ['\u0394\u03b5','\u03a4\u03c1','\u03a4\u03b5','\u03a0\u03b5','\u03a0\u03b1','\u03a3\u03b1','\u039a\u03c5']
// Legend labels
const LEGEND = [
    {k:'w', label:'\u0386\u03c1\u03b4\u03b5\u03c5\u03c3\u03b7'},
    {k:'s', label:'\u03a8\u03b5\u03ba\u03b1\u03c3\u03bc\u03cc\u03c2'},
    {k:'f', label:'\u039b\u03af\u03c0\u03b1\u03bd\u03c3\u03b7'},
    {k:'h', label:'\u03a3\u03c5\u03b3\u03ba\u03bf\u03bc\u03b9\u03b4\u03ae'},
]

const COL_W = 86
const ROW_H = 48
const OX    = 23   // origin x
const OY    = 74   // grid origin y

export function CalendarCard({colorMode, title, description}: Props) {
    const t   = colorMode === 'dark' ? DARK : LIGHT
    const tc  = (k: string) => TASK_COLOR[k]?.[colorMode] ?? '#888'
    const textShadow = colorMode === 'dark' ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)'

    return (
        <div style={{position:'relative', width:'100%', borderRadius:12, overflow:'hidden', lineHeight:0}}>
            <svg viewBox="0 0 640 380" style={{width:'100%', height:'auto', display:'block', background:t.bg}} xmlns="http://www.w3.org/2000/svg">

                {/* Day-of-week headers */}
                {DAY_LABELS.map((lbl, col) => (
                    <text
                        key={lbl}
                        x={OX + col * COL_W + COL_W / 2}
                        y={OY - 12}
                        textAnchor="middle"
                        fill={col >= 5 ? t.accent : t.muted}
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="system-ui"
                    >{lbl}</text>
                ))}

                {/* Horizontal divider under day headers */}
                <line x1={OX} y1={OY - 4} x2={OX + 7 * COL_W} y2={OY - 4} stroke={t.border} strokeWidth="0.8"/>

                {/* Week rows */}
                {WEEKS.map((week, row) => (
                    <g key={row}>
                        {week.map((cell, col) => {
                            if (!cell.d) return null
                            const cx = OX + col * COL_W + COL_W / 2
                            const ry = OY + row * ROW_H
                            const isToday = cell.d === 17
                            const dots = cell.t ?? []
                            const dotSpacing = 8
                            const dotsX = cx - ((dots.length - 1) * dotSpacing) / 2
                            return (
                                <g key={col}>
                                    {isToday && (
                                        <rect
                                            x={cx - 14} y={ry + 4}
                                            width={28} height={28}
                                            rx={6}
                                            fill={t.accent}
                                            opacity={0.18}
                                        />
                                    )}
                                    <text
                                        x={cx} y={ry + 23}
                                        textAnchor="middle"
                                        fill={isToday ? t.accent : t.text}
                                        fontSize="11"
                                        fontWeight={isToday ? '700' : '400'}
                                        fontFamily="system-ui"
                                    >{cell.d}</text>
                                    {dots.map((k, di) => (
                                        <circle
                                            key={k + di}
                                            cx={dotsX + di * dotSpacing}
                                            cy={ry + 38}
                                            r={3}
                                            fill={tc(k)}
                                        />
                                    ))}
                                </g>
                            )
                        })}
                        <line x1={OX} y1={OY + (row + 1) * ROW_H} x2={OX + 7 * COL_W} y2={OY + (row + 1) * ROW_H} stroke={t.border} strokeWidth="0.5"/>
                    </g>
                ))}

                {/* Legend — dots only */}
                {LEGEND.map((item, i) => (
                    <circle key={item.k} cx={OX + i * 20 + 6} cy={348} r={4} fill={tc(item.k)}/>
                ))}
            </svg>

            {/* Text overlay */}
            <div style={{
                position:'absolute', inset:0, borderRadius:12,
                fontFamily:'var(--font-inter), system-ui, sans-serif',
                background:'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.08) 35%, transparent 100%)',
                display:'flex', flexDirection:'column', justifyContent:'flex-end',
                padding:'24px 28px',
            }}>
                <span style={{color:'#fff', fontWeight:700, fontSize:22, lineHeight:1.2, marginBottom:6, textShadow}}>{title}</span>
                <span style={{color:'rgba(255,255,255,0.80)', fontSize:14, lineHeight:1.5, textShadow}}>{description}</span>
            </div>
        </div>
    )
}



