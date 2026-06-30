'use client'

type Props = {readonly colorMode: 'dark' | 'light'; readonly title: string; readonly description: string}

const DARK  = {bg:'#0d1117', line:'rgba(255,255,255,0.08)', nodeBg:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.10)', bar:'rgba(255,255,255,0.10)'}
const LIGHT = {bg:'#f6f9f6', line:'rgba(0,0,0,0.09)',       nodeBg:'rgba(0,0,0,0.03)',       border:'rgba(0,0,0,0.10)',       bar:'rgba(0,0,0,0.10)'}

// 6 pipeline stages — colors, inner icon shapes
const STAGES = [
    {color:'#2da44e', icon:'leaf'},
    {color:'#4ade80', icon:'scissors'},
    {color:'#86efac', icon:'box'},
    {color:'#34d399', icon:'wrap'},
    {color:'#6ee7a0', icon:'truck'},
    {color:'#a7f3c5', icon:'tag'},
]

const NODE_R  = 32
const N       = STAGES.length
const PAD_X   = 80
const PIPE_Y  = 120
const STEP    = (1280 - PAD_X * 2) / (N - 1)  // ≈ 224px

// Mini icon paths centered at 0,0 — kept pure ASCII
const ICON = {
    leaf:     <><path d="M0,-14 C-10,-10 -16,2 -10,12 C-5,18 5,18 10,12 C16,2 10,-10 0,-14 Z" fill="currentColor" opacity={0.9}/><line x1="0" y1="12" x2="0" y2="-10" stroke="currentColor" strokeWidth="1.2" opacity={0.5}/></>,
    scissors: <><line x1="-10" y1="-10" x2="10" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="-10" y1="10" x2="10" y2="-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></>,
    box:      <rect x="-11" y="-11" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>,
    wrap:     <><rect x="-12" y="-8" width="24" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="-6" y1="-8" x2="-6" y2="8" stroke="currentColor" strokeWidth="1.2"/></>,
    truck:    <><rect x="-14" y="-8" width="22" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="8" y="-4" width="8" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="-8" cy="8" r="3" fill="currentColor"/><circle cx="8" cy="8" r="3" fill="currentColor"/></>,
    tag:      <><path d="M-14,0 L-4,-12 L14,-12 L14,12 L-4,12 Z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="6" cy="0" r="3" fill="currentColor"/></>,
}

export function TraceCard({colorMode, title, description}: Props) {
    const t = colorMode === 'dark' ? DARK : LIGHT
    const textShadow = colorMode === 'dark' ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)'

    return (
        <div style={{position:'relative', width:'100%', borderRadius:12, overflow:'hidden', lineHeight:0}}>
            <svg viewBox="0 0 1280 260" style={{width:'100%', height:'auto', display:'block', background:t.bg}} xmlns="http://www.w3.org/2000/svg">

                {/* Connector line */}
                <line x1={PAD_X} y1={PIPE_Y} x2={1280 - PAD_X} y2={PIPE_Y} stroke={t.line} strokeWidth="2"/>

                {STAGES.map((s, i) => {
                    const cx = PAD_X + i * STEP

                    return (
                        <g key={s.color}>
                            {/* Connecting dots on line */}
                            {i < N - 1 && (
                                <>
                                    <circle cx={cx + STEP * 0.33} cy={PIPE_Y} r={3} fill={t.border}/>
                                    <circle cx={cx + STEP * 0.66} cy={PIPE_Y} r={3} fill={t.border}/>
                                </>
                            )}

                            {/* Node ring */}
                            <circle cx={cx} cy={PIPE_Y} r={NODE_R + 6} fill={s.color} opacity={0.06}/>
                            <circle cx={cx} cy={PIPE_Y} r={NODE_R}     fill={t.nodeBg} stroke={s.color} strokeWidth="1.5" strokeOpacity={0.45}/>

                            {/* Icon */}
                            <g transform={`translate(${cx} ${PIPE_Y})`} color={s.color}>
                                {ICON[s.icon as keyof typeof ICON]}
                            </g>

                            {/* Step number */}
                            <text x={cx} y={PIPE_Y + NODE_R + 18} textAnchor="middle" fill={s.color} fontSize="9" fontWeight="700" fontFamily="monospace" opacity={0.7}>{String(i + 1).padStart(2,'0')}</text>

                            {/* Bar below */}
                            <rect x={cx - 28} y={PIPE_Y + NODE_R + 26} width={56} height={4} rx={2} fill={s.color} opacity={0.18}/>
                            <rect x={cx - 28} y={PIPE_Y + NODE_R + 26} width={56 * (0.5 + i * 0.1)} height={4} rx={2} fill={s.color} opacity={0.45}/>
                        </g>
                    )
                })}
            </svg>

            {/* Text overlay */}
            <div style={{
                position:'absolute', inset:0, borderRadius:12,
                fontFamily:'var(--font-inter), system-ui, sans-serif',
                background:'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 30%, transparent 100%)',
                display:'flex', flexDirection:'column', justifyContent:'flex-end',
                padding:'18px 28px',
            }}>
                <span style={{color:'#fff', fontWeight:700, fontSize:22, lineHeight:1.2, marginBottom:4, textShadow}}>{title}</span>
                <span style={{color:'rgba(255,255,255,0.80)', fontSize:14, lineHeight:1.5, textShadow}}>{description}</span>
            </div>
        </div>
    )
}

