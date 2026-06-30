'use client'

type Props = {readonly colorMode: 'dark' | 'light'; readonly title: string; readonly description: string}

const DARK  = {bg:'#0d1117', ringBg:'rgba(255,255,255,0.06)', dot:'rgba(255,255,255,0.18)', label:'rgba(255,255,255,0.25)'}
const LIGHT = {bg:'#f6f9f6', ringBg:'rgba(0,0,0,0.07)',       dot:'rgba(0,0,0,0.18)',       label:'rgba(0,0,0,0.25)'}

const R   = 44          // ring radius
const SW  = 9           // stroke width
const C   = 2 * Math.PI * R  // circumference ≈ 276.46

const PEOPLE = [
    {color:'#2da44e', pct:0.85, days:[1,1,1,1,1,0,0]},
    {color:'#4ade80', pct:0.62, days:[1,1,0,1,1,0,0]},
    {color:'#86efac', pct:1.00, days:[1,1,1,1,1,1,0]},
    {color:'#34d399', pct:0.45, days:[0,1,1,1,1,0,0]},
    {color:'#6ee7a0', pct:0.78, days:[1,0,1,0,1,1,0]},
]

const COL_W = 128   // 640 / 5
const RING_Y = 148
const DAYS_Y = 220

export function EmployeesCard({colorMode, title, description}: Props) {
    const t = colorMode === 'dark' ? DARK : LIGHT
    const textShadow = colorMode === 'dark' ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)'

    return (
        <div style={{position:'relative', width:'100%', borderRadius:12, overflow:'hidden', lineHeight:0}}>
            <svg viewBox="0 0 640 320" style={{width:'100%', height:'auto', display:'block', background:t.bg}} xmlns="http://www.w3.org/2000/svg">

                {PEOPLE.map((p, i) => {
                    const cx  = COL_W * i + COL_W / 2
                    const arc = C * Math.min(p.pct, 1)

                    return (
                        <g key={p.color}>
                            {/* Ring background */}
                            <circle cx={cx} cy={RING_Y} r={R} fill="none" stroke={t.ringBg} strokeWidth={SW}/>

                            {/* Progress arc */}
                            <circle
                                cx={cx} cy={RING_Y} r={R}
                                fill="none"
                                stroke={p.color}
                                strokeWidth={SW}
                                strokeDasharray={`${arc} ${C}`}
                                strokeLinecap="round"
                                transform={`rotate(-90 ${cx} ${RING_Y})`}
                                opacity={0.88}
                            />

                            {/* Glow dot at arc end */}
                            <circle
                                cx={cx + R * Math.cos((arc / R - Math.PI / 2))}
                                cy={RING_Y + R * Math.sin((arc / R - Math.PI / 2))}
                                r={4}
                                fill={p.color}
                                opacity={p.pct < 0.98 ? 0.7 : 0}
                            />

                            {/* Center avatar dot */}
                            <circle cx={cx} cy={RING_Y} r={14} fill={p.color} opacity={0.15}/>
                            <circle cx={cx} cy={RING_Y} r={7}  fill={p.color} opacity={0.85}/>

                            {/* Day presence dots */}
                            {p.days.map((active, d) => (
                                <circle
                                    key={String(d)}
                                    cx={cx - 24 + d * 8}
                                    cy={DAYS_Y}
                                    r={3}
                                    fill={active ? p.color : t.dot}
                                    opacity={active ? 0.75 : 1}
                                />
                            ))}
                        </g>
                    )
                })}
            </svg>

            {/* Text overlay */}
            <div style={{
                position:'absolute', inset:0, borderRadius:12,
                fontFamily:'var(--font-inter), system-ui, sans-serif',
                background:'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.08) 38%, transparent 100%)',
                display:'flex', flexDirection:'column', justifyContent:'flex-end',
                padding:'24px 28px',
            }}>
                <span style={{color:'#fff', fontWeight:700, fontSize:22, lineHeight:1.2, marginBottom:6, textShadow}}>{title}</span>
                <span style={{color:'rgba(255,255,255,0.80)', fontSize:14, lineHeight:1.5, textShadow}}>{description}</span>
            </div>
        </div>
    )
}
