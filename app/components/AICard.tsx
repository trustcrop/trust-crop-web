'use client'

type Props = {readonly colorMode: 'dark' | 'light'; readonly title: string; readonly description: string}

const DARK  = {bg:'#0d1117', div:'rgba(255,255,255,0.07)', userBubble:'rgba(46,164,78,0.55)', aiBubble:'rgba(46,164,78,0.10)', aiBorder:'rgba(46,164,78,0.30)', bar:'rgba(255,255,255,0.18)', barSub:'rgba(255,255,255,0.10)', leafFill:'rgba(46,164,78,0.28)', leafStroke:'#2da44e', scanStroke:'rgba(46,164,78,0.22)'}
const LIGHT = {bg:'#f6f9f6', div:'rgba(0,0,0,0.08)',       userBubble:'rgba(22,101,52,0.70)',  aiBubble:'rgba(46,164,78,0.10)', aiBorder:'rgba(46,164,78,0.25)', bar:'rgba(0,0,0,0.18)',         barSub:'rgba(0,0,0,0.10)',       leafFill:'rgba(46,164,78,0.22)', leafStroke:'#2da44e', scanStroke:'rgba(46,164,78,0.18)'}

// Leaf path centered at (960, 125)
const LEAF_PATH = 'M 960,200 C 932,178 918,148 926,116 C 933,90 987,90 994,116 C 1002,148 988,178 960,200 Z'
const MIDRIB    = 'M 960,200 L 960,96'
const VEIN_L1   = 'M 960,165 Q 940,152 932,136'
const VEIN_L2   = 'M 960,148 Q 942,135 936,118'
const VEIN_R1   = 'M 960,165 Q 980,152 988,136'
const VEIN_R2   = 'M 960,148 Q 978,135 984,118'

// Diagnosis markers on leaf
const MARKERS = [
    {cx:950, cy:112, color:'#4ade80'},
    {cx:974, cy:148, color:'#86efac'},
    {cx:944, cy:162, color:'#2da44e'},
]

export function AICard({colorMode, title, description}: Props) {
    const t = colorMode === 'dark' ? DARK : LIGHT
    const textShadow = colorMode === 'dark' ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)'

    return (
        <div style={{position:'relative', width:'100%', borderRadius:12, overflow:'hidden', lineHeight:0}}>
            <svg viewBox="0 0 1280 260" style={{width:'100%', height:'auto', display:'block', background:t.bg}} xmlns="http://www.w3.org/2000/svg">

                {/* ── LEFT: Chat panel ── */}

                {/* Row 1 — User (right) */}
                <rect x={290} y={22} width={280} height={34} rx={12} fill={t.userBubble}/>
                <rect x={306} y={33} width={160} height={6} rx={3} fill="rgba(255,255,255,0.30)"/>
                <rect x={306} y={43} width={110} height={5} rx={3} fill="rgba(255,255,255,0.18)"/>

                {/* Row 2 — AI (left) */}
                <circle cx={36} cy={96} r={14} fill="#2da44e" opacity={0.85}/>
                <rect x={58} y={70} width={260} height={40} rx={12} fill={t.aiBubble} stroke={t.aiBorder} strokeWidth="0.8"/>
                <rect x={74} y={82}  width={180} height={6} rx={3} fill={t.bar}/>
                <rect x={74} y={92}  width={220} height={5} rx={3} fill={t.barSub}/>
                <rect x={74} y={101} width={140} height={5} rx={3} fill={t.barSub}/>

                {/* Row 3 — User (right) */}
                <rect x={330} y={126} width={240} height={34} rx={12} fill={t.userBubble}/>
                <rect x={346} y={137} width={140} height={6} rx={3} fill="rgba(255,255,255,0.30)"/>
                <rect x={346} y={147} width={190} height={5} rx={3} fill="rgba(255,255,255,0.18)"/>

                {/* Row 4 — AI (left) */}
                <circle cx={36} cy={198} r={14} fill="#2da44e" opacity={0.85}/>
                <rect x={58} y={172} width={280} height={44} rx={12} fill={t.aiBubble} stroke={t.aiBorder} strokeWidth="0.8"/>
                <rect x={74} y={184} width={200} height={6} rx={3} fill={t.bar}/>
                <rect x={74} y={194} width={240} height={5} rx={3} fill={t.barSub}/>
                <rect x={74} y={203} width={160} height={5} rx={3} fill={t.barSub}/>

                {/* Typing dots — bottom left */}
                <circle cx={68}  cy={234} r={4} fill="#2da44e" opacity={0.6}/>
                <circle cx={80}  cy={234} r={4} fill="#2da44e" opacity={0.4}/>
                <circle cx={92}  cy={234} r={4} fill="#2da44e" opacity={0.2}/>

                {/* ── DIVIDER ── */}
                <line x1={640} y1={20} x2={640} y2={240} stroke={t.div} strokeWidth="1"/>

                {/* ── RIGHT: Leaf scan panel ── */}

                {/* Scan rings */}
                <circle cx={960} cy={148} r={110} fill="none" stroke={t.scanStroke} strokeWidth="0.8"/>
                <circle cx={960} cy={148} r={80}  fill="none" stroke={t.scanStroke} strokeWidth="0.8" opacity={0.7}/>
                <circle cx={960} cy={148} r={52}  fill="none" stroke={t.scanStroke} strokeWidth="0.8" opacity={0.5}/>

                {/* Crosshair */}
                <line x1={960} y1={30}  x2={960} y2={52}  stroke={t.scanStroke} strokeWidth="0.8"/>
                <line x1={960} y1={244} x2={960} y2={222} stroke={t.scanStroke} strokeWidth="0.8"/>
                <line x1={846} y1={148} x2={868} y2={148} stroke={t.scanStroke} strokeWidth="0.8"/>
                <line x1={1074} y1={148} x2={1052} y2={148} stroke={t.scanStroke} strokeWidth="0.8"/>

                {/* Leaf */}
                <path d={LEAF_PATH} fill={t.leafFill} stroke={t.leafStroke} strokeWidth="1.2"/>
                <path d={MIDRIB} fill="none" stroke={t.leafStroke} strokeWidth="0.9" opacity={0.6}/>
                <path d={VEIN_L1} fill="none" stroke={t.leafStroke} strokeWidth="0.6" opacity={0.5}/>
                <path d={VEIN_L2} fill="none" stroke={t.leafStroke} strokeWidth="0.5" opacity={0.4}/>
                <path d={VEIN_R1} fill="none" stroke={t.leafStroke} strokeWidth="0.6" opacity={0.5}/>
                <path d={VEIN_R2} fill="none" stroke={t.leafStroke} strokeWidth="0.5" opacity={0.4}/>

                {/* Diagnosis markers */}
                {MARKERS.map((m) => (
                    <g key={m.color}>
                        <circle cx={m.cx} cy={m.cy} r={10} fill={m.color} opacity={0.12}/>
                        <circle cx={m.cx} cy={m.cy} r={5}  fill={m.color} opacity={0.90}/>
                    </g>
                ))}

                {/* Marker connector lines + dots (right side legend) */}
                <line x1={MARKERS[0].cx + 6} y1={MARKERS[0].cy} x2={1080} y2={90}  stroke={MARKERS[0].color} strokeWidth="0.7" opacity={0.5} strokeDasharray="3 2"/>
                <line x1={MARKERS[1].cx + 6} y1={MARKERS[1].cy} x2={1080} y2={148} stroke={MARKERS[1].color} strokeWidth="0.7" opacity={0.5} strokeDasharray="3 2"/>
                <line x1={MARKERS[2].cx - 4} y1={MARKERS[2].cy} x2={1080} y2={186} stroke={MARKERS[2].color} strokeWidth="0.7" opacity={0.5} strokeDasharray="3 2"/>

                <circle cx={1084} cy={90}  r={4} fill={MARKERS[0].color} opacity={0.85}/>
                <circle cx={1084} cy={148} r={4} fill={MARKERS[1].color} opacity={0.85}/>
                <circle cx={1084} cy={186} r={4} fill={MARKERS[2].color} opacity={0.85}/>

                {/* Legend bars */}
                <rect x={1096} y={85}  width={80} height={5} rx={3} fill={MARKERS[0].color} opacity={0.35}/>
                <rect x={1096} y={93}  width={55} height={4} rx={3} fill={MARKERS[0].color} opacity={0.20}/>
                <rect x={1096} y={143} width={65} height={5} rx={3} fill={MARKERS[1].color} opacity={0.35}/>
                <rect x={1096} y={151} width={45} height={4} rx={3} fill={MARKERS[1].color} opacity={0.20}/>
                <rect x={1096} y={181} width={72} height={5} rx={3} fill={MARKERS[2].color} opacity={0.35}/>
                <rect x={1096} y={189} width={50} height={4} rx={3} fill={MARKERS[2].color} opacity={0.20}/>

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

