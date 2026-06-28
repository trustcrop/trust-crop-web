'use client'

import {Bento, Section} from '@primer/react-brand'
import Image from 'next/image'
import content from '../content/el.json'
import {useTheme} from './ThemeContext'

type CardData = {src: string; title: string; description: string; width: number; height: number}

const OverlayCard = ({src, title, description, width, height}: CardData) => (
    <div style={{position: 'relative', width: '100%'}}>
        <Image
            src={src}
            alt={title}
            width={width}
            height={height}
            style={{width: '100%', height: 'auto', display: 'block', borderRadius: 12}}
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
                    <Bento.Visual padding="none"><OverlayCard {...agrotemachia} /></Bento.Visual>
                </Bento.Item>

                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 5}} rowSpan={2} flow="column" colorMode={colorMode}>
                    <Bento.Visual padding="none"><OverlayCard {...apothiki} /></Bento.Visual>
                </Bento.Item>

                {/* Row 2 */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode={colorMode}>
                    <Bento.Visual padding="none"><OverlayCard {...mitroo} /></Bento.Visual>
                </Bento.Item>

                {/* Row 3 */}
                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 7}} rowSpan={2} flow="column" colorMode={colorMode}>
                    <Bento.Visual padding="none"><OverlayCard {...ergatiko} /></Bento.Visual>
                </Bento.Item>

                <Bento.Item columnSpan={{xsmall: 12, small: 12, medium: 5}} rowSpan={2} flow="column" colorMode={colorMode}>
                    <Bento.Visual padding="none"><OverlayCard {...eidopoiiseis} /></Bento.Visual>
                </Bento.Item>

                {/* Row 4 */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode={colorMode}>
                    <Bento.Visual padding="none"><OverlayCard {...ai} /></Bento.Visual>
                </Bento.Item>

            </Bento>
        </Section>
    )
}
