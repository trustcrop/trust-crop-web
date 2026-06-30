'use client'

type Props = {readonly colorMode: 'dark' | 'light'; readonly title: string; readonly description: string}

const DARK  = {bg:'#0d1117', rowSel:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.06)', titleBar:'rgba(255,255,255,0.20)', subBar:'rgba(255,255,255,0.10)', dot:'rgba(255,255,255,0.18)'}
const LIGHT = {bg:'#f6f9f6', rowSel:'rgba(0,0,0,0.04)',       border:'rgba(0,0,0,0.07)',       titleBar:'rgba(0,0,0,0.18)',       subBar:'rgba(0,0,0,0.09)',       dot:'rgba(0,0,0,0.15)'}

const ALERTS = [
    {color:'#4ade80', titleW:210, subW:140, isNew:true},
    {color:'#2da44e', titleW:175, subW:120},
    {color:'#86efac', titleW:195, subW:105, sel:true},
    {color:'#34d399', titleW:160, subW:130},
    {color:'#6ee7a0', titleW:185, subW:95},
]

const ROW_H  = 58
const ROW_Y0 = 50
const LEFT_X = 20

export function AlertsCard({colorMode, title, description}: Props) {
    const t = colorMode === 'dark' ? DARK : LIGHT
    const textShadow = colorMode === 'dark' ? '0 1px 3px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)'

    return (
        <div style={{position:'relative', width:'100%', borderRadius:12, overflow:'hidden', lineHeight:0}}>
            <svg viewBox="0 0 480 380" style={{width:'100%', height:'auto', display:'block', background:t.bg}} xmlns="http://www.w3.org/2000/svg">

                {/* Unread count dots — top right */}
                {ALERTS.map((a, i) => (
                    <circle key={a.color + String(i)} cx={460 - i * 14} cy={24} r={4} fill={a.color} opacity={0.75}/>
                ))}

                {/* Alert rows */}
                {ALERTS.map((alert, i) => {
                    const ry = ROW_Y0 + i * ROW_H
                    const cy = ry + ROW_H / 2

                    return (
                        <g key={alert.color + String(i)}>
                            {/* Row bg */}
                            {alert.sel && <rect x="0" y={ry} width="480" height={ROW_H} fill={t.rowSel}/>}

                            {/* Left severity stripe */}
                            <rect x={LEFT_X} y={ry + 8} width={3} height={ROW_H - 16} rx={2} fill={alert.color}/>

                            {/* Icon — outer glow + inner dot */}
                            <circle cx={LEFT_X + 20} cy={cy} r={13} fill={alert.color} opacity={0.10}/>
                            <circle cx={LEFT_X + 20} cy={cy} r={6}  fill={alert.color} opacity={0.90}/>

                            {/* Title bar */}
                            <rect x={LEFT_X + 40} y={cy - 11} width={alert.titleW} height={7} rx={3} fill={t.titleBar}/>

                            {/* Subtitle bar */}
                            <rect x={LEFT_X + 40} y={cy + 2}  width={alert.subW}   height={5} rx={3} fill={t.subBar}/>

                            {/* "New" badge */}
                            {alert.isNew && (
                                <circle cx={LEFT_X + 40 + alert.titleW + 10} cy={cy - 8} r={4} fill={alert.color}/>
                            )}

                            {/* Timestamp dot row — right side */}
                            <circle cx={430} cy={cy - 4} r={2} fill={t.dot}/>
                            <circle cx={422} cy={cy - 4} r={2} fill={t.dot}/>
                            <circle cx={414} cy={cy - 4} r={2} fill={t.dot}/>

                            {/* Divider */}
                            <line x1={LEFT_X + 4} y1={ry + ROW_H} x2={464} y2={ry + ROW_H} stroke={t.border} strokeWidth="0.5"/>
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

