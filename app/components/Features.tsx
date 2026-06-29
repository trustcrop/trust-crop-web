'use client'

import {Bento, Section} from '@primer/react-brand'
import Image from 'next/image'
import content from '../content/el.json'
import {useTheme} from './ThemeContext'

type CardData = {src: string; title: string; description: string; width: number; height: number; maxHeight?: number; objectPosition?: string}

const OverlayCard = ({src, title, description, width, height, maxHeight, objectPosition = 'top'}: CardData) => (
    <div style={{position: 'relative', width: '100%', ...(maxHeight ? {maxHeight, overflow: 'hidden', borderRadius: 12} : {})}}>
        <Image
            src={src}
            alt={title}
            width={width}
            height={height}
            style={{
                width: '100%',
                height: maxHeight ? maxHeight : 'auto',
                objectFit: maxHeight ? 'cover' : undefined,
                objectPosition,
                display: 'block',
                borderRadius: 12,
            }}
        />
        <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 12,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '24px 28px',
        }}>
            <span style={{color: '#fff', fontWeight: 700, fontSize: 22, lineHeight: 1.2, marginBottom: 6}}>{title}</span>
            <span style={{color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.5}}>{description}</span>
        </div>
    </div>
)

const [agrotemachia, apothiki, mitroo, ergatiko, eidopoiiseis, ai] = content.featureCards

export function Features() {
    const {colorMode} = useTheme()

    return (
        <Section id="features" paddingBlockStart="none">
            <Bento>

                {/* Row 1 */}
                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 7}} rowSpan={2} flow="column" colorMode={colorMode}>
                    <Bento.Visual><OverlayCard
                        {...agrotemachia}
                        src={colorMode === 'dark'
                            ? '/images/dark/geochartis.png'
                            : '/images/light/geochartis.png'}
                        width={2406}
                        height={1528}
                        maxHeight={400}
                    /></Bento.Visual>
                </Bento.Item>

                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 5}} rowSpan={2} flow="column" colorMode={colorMode}>
                    <Bento.Visual><OverlayCard
                        {...apothiki}
                        src={colorMode === 'dark'
                            ? '/images/dark/agro_calendar.png'
                            : '/images/light/agro_calendar.png'}
                        width={2406}
                        height={1070}
                        maxHeight={400}
                    /></Bento.Visual>
                </Bento.Item>

                {/* Row 2 — Μητρώο: dark/light image swap */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode={colorMode}>
                    <Bento.Visual><OverlayCard
                        {...mitroo}
                        src={colorMode === 'dark'
                            ? '/images/dark/mitroo_fytoprostateutikwn.png'
                            : '/images/light/mitroo_fytoprostateutikwn.png'}
                        width={2392}
                        height={1406}
                        maxHeight={320}
                    /></Bento.Visual>
                </Bento.Item>

                {/* Row 3 */}
                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 7}} rowSpan={2} flow="column" colorMode={colorMode}>
                    <Bento.Visual><OverlayCard
                        {...ergatiko}
                        src={colorMode === 'dark'
                            ? '/images/dark/employees.png'
                            : '/images/light/employees.png'}
                        width={2414}
                        height={1220}
                        maxHeight={400}
                    /></Bento.Visual>
                </Bento.Item>

                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 5}} rowSpan={2} flow="column" colorMode={colorMode}>
                    <Bento.Visual><OverlayCard
                        {...eidopoiiseis}
                        src={colorMode === 'dark'
                            ? '/images/dark/notifications.png'
                            : '/images/light/notifications.png'}
                        width={1224}
                        height={1376}
                        maxHeight={400}
                    /></Bento.Visual>
                </Bento.Item>

                {/* Row 4 */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode={colorMode}>
                    <Bento.Visual><OverlayCard
                        {...ai}
                        src={colorMode === 'dark'
                            ? '/images/dark/ai.png'
                            : '/images/light/ai.png'}
                        width={2038}
                        height={1338}
                        maxHeight={520}
                        objectPosition="center"
                    /></Bento.Visual>
                </Bento.Item>

            </Bento>
        </Section>
    )
}
