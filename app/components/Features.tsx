'use client'

import {Bento, Section} from '@primer/react-brand'
import Image from 'next/image'
import content from '../content/el.json'
import {AICard} from './AICard'
import {AlertsCard} from './AlertsCard'
import {CalendarCard} from './CalendarCard'
import {EmployeesCard} from './EmployeesCard'
import {GeoMapCard} from './GeoMapCard'
import {RegistryCard} from './RegistryCard'
import {TraceCard} from './TraceCard'
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
                height: maxHeight ?? 'auto',
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

const [agrotemachia, apothiki, mitroo, ergatiko, eidopoiiseis, ai, ichni] = content.featureCards

export function Features() {
    const {colorMode} = useTheme()

    return (
        <Section id="features" paddingBlockStart="none">
            <Bento>

                {/* Row 1 — swapped: Εργατικό (7) + Ειδοποιήσεις (5) */}
                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 7}} rowSpan={2} flow="column" colorMode="dark">
                    <Bento.Visual>
                        <EmployeesCard colorMode="dark" title={ergatiko.title} description={ergatiko.description}/>
                    </Bento.Visual>
                </Bento.Item>

                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 5}} rowSpan={2} flow="column" colorMode="dark">
                    <Bento.Visual>
                        <AlertsCard colorMode="dark" title={eidopoiiseis.title} description={eidopoiiseis.description}/>
                    </Bento.Visual>
                </Bento.Item>

                {/* Row 2 — Μητρώο (12) */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode="dark">
                    <Bento.Visual>
                        <RegistryCard colorMode="dark" title={mitroo.title} description={mitroo.description}/>
                    </Bento.Visual>
                </Bento.Item>

                {/* Row 3 — swapped: Αγροτεμάχια (7) + Εργασίες (5) */}
                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 7}} rowSpan={2} flow="column" colorMode="dark">
                    <Bento.Visual>
                        <GeoMapCard colorMode="dark" title={agrotemachia.title} description={agrotemachia.description}/>
                    </Bento.Visual>
                </Bento.Item>

                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 5}} rowSpan={2} flow="column" colorMode="dark">
                    <Bento.Visual>
                        <CalendarCard colorMode="dark" title={apothiki.title} description={apothiki.description}/>
                    </Bento.Visual>
                </Bento.Item>

                {/* Row 4 — ΑΙ (12) */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode="dark">
                    <Bento.Visual>
                        <AICard colorMode="dark" title={ai.title} description={ai.description}/>
                    </Bento.Visual>
                </Bento.Item>

                {/* Row 5 — Ιχνηλασιμότητα (12) */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode="dark">
                    <Bento.Visual>
                        <TraceCard colorMode="dark" title={ichni.title} description={ichni.description}/>
                    </Bento.Visual>
                </Bento.Item>

            </Bento>
        </Section>
    )
}
