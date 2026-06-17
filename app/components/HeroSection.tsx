'use client'

import {BreakoutBanner, Link, Label, Section} from '@primer/react-brand'
import content from '../content/el.json'

const {hero} = content

const bannerImage = 'https://github.com/user-attachments/assets/a28110fd-d019-41a4-8f80-b49ae8895708';

// const bannerImage = "/images/break-banner.jpg"

export function HeroSection() {
    return (
        <Section paddingBlockStart="none">
            <BreakoutBanner
                align="center"
                backgroundImageSrc={{
                    narrow: bannerImage,
                    regular: bannerImage,
                    wide: bannerImage,
                }}
                backgroundImageSize="cover"
                backgroundImagePosition="center"
                style={{paddingBlock: 'clamp(5rem, 12vw, 10rem)'}}
            >
                <Label color="green" size="medium">
                    {hero.label}
                </Label>

                <BreakoutBanner.Heading>
                    {hero.heading[0]}
                    {hero.heading[1] ? <><br/>{hero.heading[1]}</> : null}
                </BreakoutBanner.Heading>

                <BreakoutBanner.Description>
                    {hero.description}
                </BreakoutBanner.Description>

                <BreakoutBanner.LinkGroup>
                    <Link
                        href="https://app.trustcrop.gr"
                        variant="accent"
                        size="large"
                        arrowDirection="end"
                    >
                        {hero.primaryAction}
                    </Link>
                </BreakoutBanner.LinkGroup>
            </BreakoutBanner>
        </Section>
    )
}
